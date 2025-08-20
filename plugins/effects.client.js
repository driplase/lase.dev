import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { GSDevTools } from "gsap/GSDevTools";
import { useRouter } from "#app";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(GSDevTools);

export default defineNuxtPlugin((nuxtApp) => {
  const applyEffects = () => {

    document.querySelectorAll(".wiggle").forEach(wiggle => {
      const isTextWg = wiggle.classList.contains("wg-text")
      let f = {
        skewX: 2,
        skewY: 10,
        rotateX: 5,
        rotateY: 8,
        rotateZ: 10,
      };
      if (isTextWg) f = {
        skewX: 1,
        skewY: 2,
        rotateX: 1.7,
        rotateY: 1.5,
        rotateZ: 3.2,
      }
      let tl = gsap.timeline();
      
      const animate = (event) => {
        tl.clear()
        tl.set(wiggle, {
          skewX: gsap.utils.random(-f.skewX, f.skewX),
          skewY: gsap.utils.random(-f.skewY, f.skewY),
          rotateX: gsap.utils.random(-f.rotateX, f.rotateX),
          rotateY: gsap.utils.random(-f.rotateY, f.rotateY),
          rotateZ: gsap.utils.random(-f.rotateZ, f.rotateZ)
        })
        tl.to(wiggle, {
          ease: "elastic.out",
          skewX: 0,
          skewY: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          duration: 1
        })
        tl.to(wiggle, {
          ease: "expo.out",
          duration: 1
        })
      }
      
      wiggle.addEventListener('mouseenter', animate)
      wiggle.addEventListener('click', animate)
    })

    document.querySelectorAll(".woosh").forEach(woosh => {
      const isTextWsh = woosh.classList.contains("wsh-text");
      let f = {
        scale: [1.1, 1.5]
      };
      if (isTextWsh) f = {
        scale: [1.05, 1.2]
      }
      let tl = gsap.timeline();

      const animate = (event) => {
        tl.clear()
        tl.set(woosh, {
          scale: gsap.utils.random(f.scale[0], f.scale[1]),
        })
        tl.to(woosh, {
          ease: "elastic.out",
          scale: 1,
          duration: 1
        })  
      };
      
      woosh.addEventListener('mouseenter', animate);
      woosh.addEventListener('click', animate);
    });
    
    document.querySelectorAll('.flash').forEach(element => {
      let tl = gsap.timeline({ paused: true });
      
      tl.set(element, {
        textShadow: "0 0 16px",
        filter: "brightness(1.5)"
      })
      tl.to(element, {
        ease: "expo.out",
        textShadow: "0 0 5px",
        filter: "brightness(1)",
        duration: .64
      })
      
      const animate = (event) => {
        tl.seek(0)
        tl.play()
      };

      element.addEventListener('mouseenter', animate)
      element.addEventListener('click', animate)
    })

    let rainbowSplit = SplitText.create(".rainbow", {
      type: "words, chars",
      onSplit(self) {
        gsap.from(self.chars, {
          duration: 2.4,
          filter: "hue-rotate(360deg)",
          stagger: 0.1,
          repeat: -1
        });
      },
    })
    let rainbowFastSplit = SplitText.create(".rainbow-fast", {
      type: "words, chars",
      onSplit(self) {
        gsap.from(self.chars, {
          duration: .64,
          filter: "hue-rotate(360deg)",
          stagger: 0.05,
          repeat: -1
        });
      },
    })
  };

  nuxtApp.hook('app:mounted', () => {
    setTimeout(applyEffects, 25);
    const router = useRouter();
    let lastPath = router.currentRoute.value.path;
    router.afterEach((to, from) => {
      if (to.path !== lastPath) {
        lastPath = to.path;
        setTimeout(applyEffects, 0);
      }
    });
  });
});