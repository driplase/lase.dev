<script setup lang="ts">
import { Application, Assets, MeshRope, Graphics, Point, Sprite } from 'pixi.js';

useHeadTemplate(useRoute(), {
  title: "tanabata/bending-failure",
  description: "wanted a natural animation and tried bending the image, which resulted failing."
})

const canvasContent = useTemplateRef("canvasContent");

onMounted(async () => {
  const app = new Application();
  await app.init({
    width: 1024,
    height: 1024,
    backgroundColor: 0,
    backgroundAlpha: 0,
  })
  canvasContent.value?.appendChild(app.canvas);
  
  const treeTexture = await Assets.load('/assets/images/tanabata/tree.png');
  const treeStripTexture = await Assets.load('/assets/images/tanabata/tree_strip.png');
  const tempSprite = new Sprite(treeTexture);
  app.stage.addChild(tempSprite);
  const treePoints: Point[] = [
    new Point(305, 750),
    new Point(320, 700),
    new Point(340, 650),
    new Point(365, 590),
    new Point(410, 530),
    new Point(470, 465),
    new Point(520, 415),
    new Point(570, 380),
    new Point(608, 355),
    new Point(675, 321),
    new Point(725, 299),
  ];
  const tree = new MeshRope({
    texture: treeStripTexture,
    points: treePoints,
  });

  app.stage.addChild(tree);
  
  // const tanzakuTexture = await Assets.load('/assets/images/tanabata/tanzaku.png');
  // const tanzaku = new MeshRope({
  //   texture: tanzakuTexture,
  //   points: [...treePoints],
  // });

  // app.stage.addChild(tanzaku);

  const g = new Graphics();

  g.x = tree.x;
  g.y = tree.y;
  app.stage.addChild(g);

  app.ticker.add(() => {
    // renderPoints();
  });

  function renderPoints() {
    g.clear();

    const firstPoint = treePoints[0];
    if (!firstPoint) return;

    g.moveTo(firstPoint.x, firstPoint.y);

    for (let i = 1; i < treePoints.length; i++) {
      const point = treePoints[i];
      if (!point) continue;

      g.lineTo(point.x, point.y);
      g.stroke({ width: 2, color: 0xffc2c2 });
    }

    for (let i = 1; i < treePoints.length; i++) {
      const point = treePoints[i];
      if (!point) continue;

      g.circle(point.x, point.y, 10);
      g.fill({ color: 0xff0022 });
      g.stroke({ width: 2, color: 0xffc2c2 });
    }
  }
});
</script>

<template>
  <div class="canvas-content" ref="canvasContent">

  </div>
</template>