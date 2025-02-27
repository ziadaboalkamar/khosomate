
let vals = [3000, 7000];
let timer;

const $slider = document.getElementById("slider");
const $slider2 = document.getElementById("slider2");
const currency = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});

const formatter = (value) => currency.format(value);

const stop = () => {
    const $slider = document.querySelector("#PriceGradient");
    const $slider2 = document.querySelector("#PriceGradient");
    $slider.classList.remove("up", "down");
    $slider2.classList.remove("up", "down");
};

const slide = (e) => {
    const $slider = document.querySelector("#PriceGradient");
    const $slider2 = document.querySelector("#PriceGradient");
    const delta = -(e.detail.previousValue - e.detail.value);
    if (delta > 0) {
        $slider.classList.add("up");
        $slider.classList.remove("down");
        $slider2.classList.add("up");
        $slider2.classList.remove("down");
    } else {
        $slider.classList.add("down");
        $slider.classList.remove("up");
        $slider2.classList.add("down");
        $slider2.classList.remove("up");
    }
    
    clearTimeout(timer);
    timer = setTimeout(stop, 66);
};

const slider = new RangeSliderPips({
    target: $slider,
    props: {
        id: "PriceGradient",
        min: 0,
        max: 10000,
        values: vals,
        pips: true,
        range: true,
        pipstep: 200,
        first: false,
        last: false,
        float: true,
        formatter: formatter
    }
});
const slider2 = new RangeSliderPips({
    target: $slider2,
    props: {
        id: "PriceGradient",
        min: 0,
        max: 10000,
        values: [0], // Keep only the max value
        pips: true,
        range: false,  // Keep range enabled if required by library
        pipstep: 200,
        first: false,
        last: false,
        float: true,
        direction: "rtl", // Try this if supported
        formatter: formatter
    }
});

slider.$on('change', slide);
slider.$on('stop', stop);
slider2.$on('change', slide);
slider2.$on('stop', stop);
setTimeout(() => {
    document.querySelector("#PriceGradient .rangeHandle").focus()
}, 1000 );