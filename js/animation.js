
let count = 2;
let btn = document.querySelector('.btn-area');
let skyArea = document.querySelector('.light-group');
let dotArea = document.querySelector('.dot-group');
let skylightNumber = document.querySelector('.sky-light-number');
let mySplitText = null;
let lightNumber = 0;

let dotTotal = 20;
let w = window.innerWidth;
let h = window.innerHeight;

window.addEventListener('resize', ()=>{
    w = window.innerWidth
})

document.body.addEventListener('mousemove', (e)=>{
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    gsap.set('.cursor', {
        x: mouseX,
        y: mouseY
    });
    gsap.to('.shape',{
        x: mouseX - 25,
        y: mouseY - 25,
        duration: 0.5,
        stagger: -0.1,
    });
    gsap.to( '.logo', 0.2, {
        x : -(( e.clientX - (window.innerWidth/2) ) / 30 ),
        y : -(( e.clientY - (window.innerHeight/2) ) / 30 )
    });
})

const animationTL = gsap.timeline({
    paused: true
});

mySplitText = new SplitText('.letter', {type: 'chars'})

btn.addEventListener('mouseover', ()=>{
    gsap.defaults({ ease: 'back.out(1.4)'});
    animationTL.to('.rabbit-shadow', {
        rotate: 0,
        opacity: 1,
        scale: 1,
    }).to(mySplitText.chars, {
        opacity: 1,
        duration: 1,
        y: 0,
        stagger: 0.1,
    },0.5);
    animationTL.play();
})

btn.addEventListener('mouseleave', ()=>{
    animationTL.reverse();
})

skylightNumber.innerHTML = lightNumber

// 孔明燈
btn.addEventListener('click', ()=>{
    count ++;
    lightNumber ++;
    skylightNumber.innerHTML = lightNumber
    let img = document.createElement('img');
    img.classList.add('kong-ming-light-' + count);
    img.src= './images/kong-ming-light.svg';
    skyArea.appendChild(img);

    let tl = gsap.timeline();
    let range = w > 767 ? 1500 : 700

    tl.to(img, 1, {
        x: Math.floor(Math.random() * range),
        y: "-=50",
        scale: 1,
        rotation: 8,
        opacity:1,
        ease: Sine.easeInOut
    }).to(img, 8, {
        x: Math.floor(Math.random() * range),
        y: "-=400",
        rotation: 20,
        scale: 0.8,
        opacity:1,
        ease: Sine.easeInOut
    }).to(img, 8, {
        x: Math.floor(Math.random() * range),
        y: "-=600",
        rotation: 0,
        scale: 0.7,
        opacity:1,
        ease: Sine.easeInOut
    }).to(img, 8, {
        x: Math.floor(Math.random() * range),
        y: "-=800",
        rotation: 20,
        scale: 0.4,
        opacity: 0.5,
        ease: Sine.easeInOut
    }).to(img, 8, {
        x: Math.floor(Math.random() * range),
        y: "-=900",
        rotation: 15,
        scale: 0.2,
        opacity: 0,
        ease: Sine.easeInOut,
        onComplete: function(){
            img.remove();
            lightNumber--;
            skylightNumber.innerHTML = lightNumber
        }
    });
});

set();
dotStyleFirst();

function set(){
    gsap.set(mySplitText.chars, {
        opacity: 0,
        y: 120,
    });
    gsap.set('.rabbit-shadow', {
        transformOrigin: "center bottom",
        scale: 0,
        rotate: -90,
    })
}

function dotStyleFirst(){
    for(let i = 0; i<dotTotal; i++){
        let leaf = document.createElement('img');
        leaf.src = './images/dot2.png'
        gsap.set(leaf, {
          attr: {
            class: 'dot'
          },
          x: r(0, w),
          y: r(-200, 150),
          z: r(-200, 200),
        });
        dotArea.appendChild(leaf);
        creatLeaf(leaf)
    }
}

function r(min, max){
    return min + Math.random() * (max-min)
}

function creatLeaf(el){
    gsap.to(el, r(6, 15),{
        y: h + 100,
        ease: Linear.easeNone,
        repeat: -1,
        delay: -15,
    });
    gsap.to(el, r(4, 8), {
        x: '+=100',
        rotationZ: r(0, 180),
        repeat: -1,
        yoyo: true,
        ease: Sine.easeInOut
    });
      
    gsap.to(el, r(2, 8), {
        rotationY: r(0, 360),
        repeat: -1,
        yoyo: true,
        ease: Sine.easeInOut,
        delay: -5,
    });
}
