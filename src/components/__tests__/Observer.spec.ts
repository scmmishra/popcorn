import { vi, describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

const disconnect = vi.fn();
const observe = vi.fn();

const IntersectionObserverMock = vi.fn(() => ({
  disconnect,
  observe,
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

import ObserveVue from "../Observer.vue";

describe("Observer", () => {
  it("renders properly and triggers observe", () => {
    const wrapper = mount(ObserveVue);
    expect(wrapper.classes()).toStrictEqual(["observer"]);
    expect(observe).toHaveBeenCalled();
  });

  it("callback triggers emits", () => {
    const wrapper = mount(ObserveVue);
    (wrapper.vm as any).observerCallback([{ isIntersecting: true }]);
    expect(wrapper.emitted()).toStrictEqual({ intersect: [[]] });
  });

  it("resets observer", () => {
    const wrapper = mount(ObserveVue);
    (wrapper.vm as any).resetObserver();
    expect(disconnect).toHaveBeenCalled();
  });
});
