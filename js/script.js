// Swiper

const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 1000,          
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 24,
});

// autoplayを停止。ページが読み込まれたときには再生しないようにするため
swiper.autoplay.stop();

// Intersection Observerの設定
let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // ターゲット要素が50%表示されたときにcallbackを発火
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // ビューポート内に入ったときの処理
      swiper.autoplay.start();
    } else {
      // ビューポートから出たときの処理
      swiper.autoplay.stop();
    }
  });
}, options);

// スライダーを監視対象に追加
observer.observe(document.querySelector('.swiper'));

// スライドをクリックしたら停止するようにする
const slides = document.querySelectorAll('.swiper-slide');

// 各スライド要素にクリックイベントリスナーを追加
slides.forEach(slide => {
  slide.addEventListener('click', () => {
    // クリックされた際にautoplayを停止
    swiper.autoplay.stop();
  });
});

$(function () {
  
  //FAQのアコーディオン
  $('.accordion__question').on('click', function() {
    $(this).toggleClass('active');
    $(this).next().slideToggle(200);
  });

  //ハンバーガーメニュー
  var btnMenu = $(".js-btn-menu");
  var globalNav = $(".p-sp-menu");

  btnMenu.on("click", function () {
    btnMenu.toggleClass("is-active");
    globalNav.toggleClass("is-show");
  });

  // メニュー項目がクリックされたときにメニューを閉じる
  $(".p-sp-menu__link").on("click", function () {
    btnMenu.removeClass("is-active");
    globalNav.removeClass("is-show");
  });

  //ページ内スクロール
  $('a[href^="#"]').on("click", function () {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("html, body").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing"
    );
    return false;
  });
});

$(window).on('load',function(){
  $("#loading").delay(1200).fadeOut('slow');//ローディング画面を1.2秒（1200ms）待機してからフェードアウト
});
//テキストのカウントアップの設定
var bar = new ProgressBar.Line(loading_text, {//id名を指定
  strokeWidth: 0,//進捗ゲージの太さ
  duration: 1000,//時間指定(1000＝1秒)
  trailWidth: 0,//線の太さ
  text: {//テキストの形状を直接指定 
    style: {
      position:'absolute',
      left:'50%',
      top:'80%',
      margin:'0',
      transform:'translate(-50%,-50%)',
      'font-family':'sans-serif',
      'font-size':'1.5rem',
      color:'#333',
    },
    autoStyleContainer: false //自動付与のスタイルを切る
  },
  step: function(state, bar) {
    bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
  }
});
//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画
  $("#loading_text").delay(0).fadeOut('fast');//アニメーションが終わったら#loading_textをフェードアウト
});