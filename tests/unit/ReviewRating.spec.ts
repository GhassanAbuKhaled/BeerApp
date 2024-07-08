import { shallowMount, VueWrapper } from "@vue/test-utils";
import ReviewRating from "@/components/review/ReviewRating.vue";

describe("ReviewRating.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(ReviewRating, {
      props: {
        itemName: "Test Item",
        starCount: 5,
        id:"tRating"
      },
      attachTo: document.body,
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders correctly with given props", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h6.form-label").text()).toContain("Test Item");
    expect(wrapper.findAll("input[type='radio']").length).toBe(5);
  });

  it("updates the star rating on click", async () => {
    const firstStarLabel = wrapper.find("label[for='tRating-1']");
    await firstStarLabel.trigger("click");

    const firstStarInput = wrapper.find("input[type='radio']#tRating-1");
    expect((firstStarInput.element as HTMLInputElement).checked).toBe(true);
  });

});
