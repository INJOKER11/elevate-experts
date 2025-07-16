gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.service').forEach(tag => {
    const startX = 0;  // падаем строго сверху
    const startY = gsap.utils.random(-500, -300);
    const startRotate = gsap.utils.random(-45, 45);

    const endX = gsap.utils.random(-20, 20);
    const endY = gsap.utils.random(-10, 10);
    const endRotate = gsap.utils.random(-15, 15);

    gsap.fromTo(tag,
        {
            x: startX,
            y: startY,
            rotate: startRotate,
            opacity: 0,
        },
        {
            x: endX,
            y: endY,
            rotate: endRotate,
            opacity: 1,
            duration: 1.5,
            ease: "bounce",
            yoyo: true,
            repeatDelay: 1,
            scrollTrigger: {
                trigger: tag,
                start: "top 70%",
                toggleActions: "play none none reverse",
            }
        },
    );
});