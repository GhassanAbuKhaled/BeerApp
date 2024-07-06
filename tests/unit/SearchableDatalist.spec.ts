import { mount, VueWrapper } from "@vue/test-utils";
import SearchableDatalist from "@/components/utilsComponents/SearchableDatalist.vue";
import { ComponentPublicInstance } from "vue";

describe("SearchableDatalist.vue", () => {
  let wrapper: VueWrapper<ComponentPublicInstance>; // Declare wrapper outside so it can be accessed in all test cases

  beforeEach(() => {
    wrapper = mount(SearchableDatalist, {
      props: {
        id: "testId",
        name: "testName",
        label: "Test Label",
        optionsList: ["Option 1", "Option 2", "Option 3"],
        zIndex: "z-3",
      },
      attachTo: document.body,
    });
  });

  afterEach(() => {
    // Unmount the component after each test
    wrapper.unmount();
  });

  it("renders correctly", () => {
    expect(wrapper.isVisible()).toBe(true);
  });

  it("filters options based on input", async () => {
    const input = wrapper.find("input");
    input.element.value = "Option 1";
    await input.trigger("input");

    await wrapper.vm.$nextTick(); // Wait for the component to re-render

    const options = wrapper.findAll("option");
    const visibleOptions = options.filter(option => option.element.style.display !== 'none');

    expect(visibleOptions.length).toBe(1);
    expect(visibleOptions[0].text()).toBe("Option 1");
  });

  it("selects an option from the datalist", async () => {
    const input = wrapper.find("input");
    input.element.value = "Option 2";
    await input.trigger("input");

    expect(input.element.value).toBe("Option 2");
  });

  it("shows datalist when input is focused", async () => {
    const input = wrapper.find("input");
    await input.trigger("focus");

    const datalist = wrapper.find("datalist");
    expect(datalist.isVisible()).toBe(true);
  });

  it("hides datalist when clicking outside", async () => {
    const input = wrapper.find("input");
    await input.trigger("focus");

    document.body.click();
    const datalist = wrapper.find("#testIdList");
    expect(datalist.isVisible()).toBe(false);
  });
});
