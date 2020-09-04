// Slider-1
let next = document.querySelector(".next");

let prev = document.querySelector(".prev");

let slides = document.querySelectorAll(".goods_img");

let i = 0;

next.addEventListener("click", function () {
  ++i;

  if (i >= slides.length) {
    slides[i - 1].classList.remove("img_block");

    i = 0;

    slides[i].classList.add("img_block");
  } else {
    slides[i - 1].classList.remove("img_block");

    slides[i].classList.add("img_block");
  }
});

prev.addEventListener("click", function () {
  ++i;

  if (i >= slides.length) {
    slides[i - 1].classList.remove("img_block");

    i = 0;

    slides[i].classList.add("img_block");
  } else {
    slides[i - 1].classList.remove("img_block");

    slides[i].classList.add("img_block");
  }
});

// chain length

let plus = document.querySelector(".plus");

let minus = document.querySelector(".minus");

plus.addEventListener("click", function () {
  let new_lenth = Number(document.querySelector(".lenght").innerHTML) + 0.5;

  document.querySelector(".lenght").innerHTML = String(new_lenth);
});

minus.addEventListener("click", function () {
  let new_lenth = Number(document.querySelector(".lenght").innerHTML) - 0.5;

  document.querySelector(".lenght").innerHTML = String(new_lenth);
});

// set_price

let price = document.querySelectorAll(".g_price");

if (price.length == 3) {
  let set_price = Number(document.querySelector(".good_price").innerHTML);

  let new_price = Number(document.querySelector(".g_setPrice").innerHTML);

  let i = 0;
  let s = 0;

  while (i <= price.length - 1) {
    s += Number(price[i].innerHTML);

    // console.log(s);
    document.querySelector(".good_price").innerHTML = String(s);

    let t = (s / 100) * 70;

    document.querySelector(".g_setPrice").innerHTML = String(t);

    i++;
  }
}

// tabs

function openTabs(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tab_content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tab_links");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// slider-1

class Slider {
  multiItemSlider(
    selector,
    wrapper,
    item,
    s_control,
    s_control_left,
    s_control_right
  ) {
    var mainElement = document.querySelector(selector), // основный элемент блока
      sliderWrapper = mainElement.querySelector(wrapper), // обертка для .slider-item
      sliderItems = mainElement.querySelectorAll(item), // элементы (.slider-item)
      sliderControls = mainElement.querySelectorAll(s_control), // элементы управления
      sliderControlLeft = mainElement.querySelector(s_control_left), // кнопка "LEFT"
      sliderControlRight = mainElement.querySelector(s_control_right), // кнопка "RIGHT"
      wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), // ширина обёртки
      itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width), // ширина одного элемента
      positionLeftItem = 0, // позиция левого активного элемента
      transform = 0, // значение транфсофрмации .slider_wrapper
      step = (itemWidth / wrapperWidth) * 100, // величина шага (для трансформации)
      items = []; // массив элементов

    // наполнение массива _items
    sliderItems.forEach(function (item, index) {
      items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position > items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return items[position.getItemMin()].position;
      },
      getMax: function () {
        return items[position.getItemMax()].position;
      },
    };

    var transformItem = function (direction) {
      var nextItem;
      var prevItem;
      if (direction === "right") {
        positionLeftItem++;
        if (positionLeftItem + wrapperWidth / itemWidth > position.getMax()) {
          nextItem = position.getItemMin();
          prevItem = position.getItemMax();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform =
            "translateX(" + items[nextItem].transform + "%)";
        }
        transform -= step;
        sliderWrapper.style.transform = "translateX(" + transform + "%)";
      }
      if (direction === "left") {
        positionLeftItem--;
        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform =
            "translateX(" + items[nextItem].transform + "%)";
        }
        transform += step;
        sliderWrapper.style.transform = "translateX(" + transform + "%)";
      }
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var controlClick = function (e) {
      if (e.target.classList.contains("slider__control")) {
        e.preventDefault();
        var direction = e.target.classList.contains("slider__control_right")
          ? "right"
          : "left";
        transformItem(direction);
      } else {
        e.preventDefault();
        var direction = e.target.classList.contains("slider_control_right")
          ? "right"
          : "left";
        transformItem(direction);
      }
    };

    var setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      sliderControls.forEach(function (item) {
        item.addEventListener("click", controlClick);
      });
    };

    // инициализация
    setUpListeners();

    return {
      right: function () {
        // метод right
        transformItem("right");
      },
      left: function () {
        // метод left
        transformItem("left");
      },
    };
  }
}

var slider = new Slider();
slider.multiItemSlider(
  ".also_buy_slider",
  ".slider__wrapper",
  ".slider__item",
  ".slider__control",
  ".slider__control_left",
  ".slider__control_right"
);

var slider2 = new Slider();
slider2.multiItemSlider(
  ".your_see_slider",
  ".your_see_slider__wrapper",
  ".slider_item",
  ".s_control",
  ".slider_control_left",
  ".slider_control_right"
);
