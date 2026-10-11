import { ref, watch, type Ref } from "vue";

/**
 * Tracks whether a scroller has hidden content above/below, so the edge
 * be faded out.
 *
 * Watches the element ref instead of using onMounted because popup content
 * mounts and unmounts with its open state, long after the owner mounts.
 */
export function useScrollFade(el: Ref<HTMLElement | undefined>) {
  const fadeTop = ref(false);
  const fadeBottom = ref(false);

  const update = () => {
    const e = el.value;
    if (!e) return;
    // 1px slack: fractional scrollTop never quite reaches the exact end.
    fadeTop.value = e.scrollTop > 1;
    fadeBottom.value = e.scrollTop + e.clientHeight < e.scrollHeight - 1;
  };

  // ponytail: only the scroller's own size is observed; content that
  // grows while open won't refresh the fade until the next scroll.
  const resize = new ResizeObserver(update);

  watch(el, (next, prev) => {
    prev?.removeEventListener("scroll", update);
    if (prev) resize.unobserve(prev);
    if (!next) return;
    next.addEventListener("scroll", update, { passive: true });
    resize.observe(next);
    update();
  });

  return { fadeTop, fadeBottom };
}
