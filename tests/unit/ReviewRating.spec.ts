import { mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";
import ReviewRating from "@/components/review/ReviewRating.vue"; // Adjust the path according to your project structure

describe("ReviewRating.vue", () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  const numberOfStars = 5;
  const name = "Test Item";

  beforeEach(() => {
    wrapper = mount(ReviewRating, {
      props: { name, numberOfStars },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the correct number of stars", () => {
    // Check if the correct number of stars is rendered
    const stars = wrapper.findAll('input[type="radio"]');
    expect(stars.length).toBe(numberOfStars);
  });

  it("sets the correct name for the inputs", () => {
    // Check if the name attribute of inputs is correct
    const stars = wrapper.findAll('input[type="radio"]');
    stars.forEach((star, index) => {
      expect(star.attributes("name")).toBe(name);
      expect(star.attributes("id")).toBe(`${name}-${index + 1}`);
      expect(star.attributes("value")).toBe(`${numberOfStars - index}`);
    });
  });

  it("renders the correct labels for the stars", () => {
    // Check if the labels are associated correctly
    const labels = wrapper.findAll("label");
    labels.forEach((label, index) => {
      expect(label.attributes("for")).toBe(`${name}-${index + 1}`);
    });
  });
});
