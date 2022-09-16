import { component$, useStore, useStyles$ } from "@builder.io/qwik";
import styles from "./family.css?inline";

type CountProps = {
  rikCount: number;
  parentCount: number;
  grandParentCount: number;
  greatGrandParentCount: number;
  pixelCount: number;
  cheetoCount: number;
  smokyCount: number;
};

export default component$(() => {
  useStyles$(styles);

  const initialCountProps: CountProps = {
    rikCount: 0,
    parentCount: 0,
    grandParentCount: 0,
    greatGrandParentCount: 0,
    pixelCount: 0,
    cheetoCount: 0,
    smokyCount: 0,
  };

  const store = useStore(initialCountProps);

  console.log("Render Root Component");

  return (
    <div>
      <GreatGrandParents counts={store} />

      <p>
        <button
          onClick$={() => {
            console.log("Click Increment");
            store.rikCount++;
            store.pixelCount++;
            store.cheetoCount++;
            store.smokyCount++;
            store.grandParentCount++;
            store.greatGrandParentCount++;
            store.parentCount++;
          }}
        >
          Increment All
        </button>
      </p>
    </div>
  );
});

export const CirclePhoto = component$((props: { src: string }) => {
  console.log(`Render CirclePhoto: ${props.src}`);
  return (
    <div>
      <svg width="100" height="100">
        <mask id="svgmask3">
          <circle fill="#ffffff" cx="50" cy="50" r="50"></circle>
        </mask>
        <image
          xlink:href={props.src}
          style="width: 100px"
          mask="url(#svgmask3)"
        ></image>
      </svg>
    </div>
  );
});

export const GreatGrandParents = component$((props: { counts: CountProps }) => {
  console.log("Render GreatGrandParents");
  return (
    <div
      class="great-grand-parent"
      onClick$={() => props.counts.greatGrandParentCount++}
    >
      <div class="flex-row">
        <CirclePhoto src="/images/great-grand-parents.png" />
        <p>GreatGrandParent Count: {props.counts.greatGrandParentCount}</p>
      </div>

      <GrandParents counts={props.counts} />
    </div>
  );
});

export const GrandParents = component$((props: { counts: CountProps }) => {
  console.log("Render GrandParents");
  return (
    <div
      class="grand-parent"
      onContextMenu$={() => {
        props.counts.grandParentCount = props.counts.grandParentCount + 2;
      }}
      onClick$={(evt) => {
        evt.stopPropagation();
        props.counts.grandParentCount++;
      }}
      preventdefault:contextmenu
    >
      <div class="flex-row">
        <CirclePhoto src="/images/grand-parents.png" />
        <p>GrandParent Count: {props.counts.grandParentCount}</p>
      </div>

      <br />
      <Parents counts={props.counts} />
    </div>
  );
});

export const Parents = component$((props: { counts: CountProps }) => {
  console.log("Render Parents");
  return (
    <div
      class="parent"
      onContextMenu$={() =>
        (props.counts.parentCount = props.counts.parentCount + 2)
      }
      onClick$={(evt) => {
        evt.stopPropagation();
        props.counts.parentCount++;
      }}
      preventdefault:contextmenu
    >
      <div class="flex-row">
        <CirclePhoto src="/images/parents.png" />
        <p>Parent Count: {props.counts.parentCount}</p>
      </div>

      <br />
      <Rik counts={props.counts} />
    </div>
  );
});

export const Rik = component$((props: { counts: CountProps }) => {
  console.log("Render Rik");
  return (
    <div
      class="rik"
      onClick$={(evt) => {
        evt.stopPropagation();
        props.counts.rikCount++;
      }}
    >
      <div class="flex-row">
        <CirclePhoto src="/images/rik.jpg" />
        <p>Rik Count: {props.counts.rikCount}</p>
      </div>

      <div class="flex-row">
        <PixelCat counts={props.counts} />
        <CheetoCat counts={props.counts} />
        <SmokyCat counts={props.counts} />
      </div>
    </div>
  );
});

export const PixelCat = component$((props: { counts: CountProps }) => {
  console.log("Render PixelCat");
  return (
    <div
      class="pixel"
      onClick$={(evt) => {
        evt.stopPropagation();
        props.counts.pixelCount++;
      }}
    >
      <div>
        <CirclePhoto src="/images/pixel.png" /><br/>
        <p>Pixel: {props.counts.pixelCount}</p>
      </div>
    </div>
  );
});

export const CheetoCat = component$((props: { counts: CountProps }) => {
  console.log("Render CheetoCat");
  return (
    <div
      class="cheeto"
      onClick$={(evt) => {
        evt.stopPropagation();
        props.counts.cheetoCount++;
      }}
    >
      <div>
        <CirclePhoto src="/images/cheeto.png" /><br/>
        <p>Cheeto: {props.counts.cheetoCount}</p>
      </div>
    </div>
  );
});

export const SmokyCat = component$((props: { counts: CountProps }) => {
  console.log("Render SmokyCat");
  return (
    <div
      class="smoky"
      onClick$={(evt) => {
        evt.stopPropagation();
        props.counts.smokyCount++;
      }}
    >
      <div>
        <CirclePhoto src="/images/smoky.png" /><br/>
        <p>Smoky: {props.counts.smokyCount}</p>
      </div>
    </div>
  );
});
