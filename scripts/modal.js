$(document).ready(function() {
  // MODAL
  var modalText = {
    
    finance: {
      title: 'Finance',
      tag: 'STOCK TRADING SIMULATOR.',
      detail:
        'Finance is a fully operational stock trading website. The program uses realtime data from IEX API to allow users to simulate buying and selling stocks.',
    },
    minesweeper: {
      title: 'Minesweeper Reborn',
      tag: 'CLASSIC GAME REIMAGINED.',
      detail:
        'Minesweeper reborn is an all new customizable version of minewseeper, offering a wide selection of textures and adjustable difficulties.',
      link: 'https://ssperrottet.github.io/Minesweeper-Game/'
    },
    newrelic: {
      title: 'Calorie Crafter',
      tag: 'HEALTHY RECIPE MANAGER.',
      detail:
        'Calorie Crafter is a digital recipebook that helps users manage and sort their favorite recipes based on nutritional information.',
    },
    zombie: {
      title: 'ZOMBICIDE',
      tag: 'CHAOTIC SURVIVAL GAME',
      detail:
        'Zombicide challenges you to survive endless waves of increasingly bizarre zombie attacks. New gear is available within the in-game shop.',
      link: 'https://ssperrottet.github.io/Zombicide-Game/' 
    },
    walker: {
      title: 'WalkerTracker',
      tag: 'PERFORMANCE METRICS.',
      detail:
        'Walker Tracker offers goal management, fitness tracking, and team competitions to companies for internal use. A Ruby on Rails and Javascript companion site for the Walker Tracker App. Features visual metrics and gamified progression system.'
    },
    powur: {
      title: 'Powur.com',
      tag: 'CONSUMER POWERED MARKETING.',
      detail:
        'Powur is a marketing platform for lead generation, recruitment, and team building. Built with Ruby on Rails and Angular-UI. Makes use of Angular-material for front-end visuals. Features complex user tree heiarchy and commission system.',
      link: 'http://www.powur.com/with/42'
    },
    mystand: {
      title: 'MyStand',
      tag: 'CROWD-FUNDED CHARITY.',
      detail:
        'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket. Single page App built with Node.js on Sails and Angular 2.0. Features social media sharing and large scale crowd-funding.'
    },
    never: {
      title: 'NeverSurrender',
      tag: 'ALS AWARENESS.',
      detail:
        'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS. Pure JavaScript marketing site to promote the new ALS NeverSurrender app.'
    },
    themall: {
      title: 'The Mall',
      tag: 'PEER GUIDED SHOPPING.',
      detail:
        'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
