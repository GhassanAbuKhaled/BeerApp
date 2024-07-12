import { mount, VueWrapper } from "@vue/test-utils";
import SearchableDatalist from "@/components/utilsComponents/searchable-datalist.vue";
import { ComponentPublicInstance, nextTick } from "vue";

describe("SearchableDatalist.vue", () => {
  let wrapper: VueWrapper<ComponentPublicInstance>; // Define wrapper outside to access it across test cases
  const validatorMock = jest.fn((input: string) => input === 'Option');

  beforeEach(() => {
    wrapper = mount(SearchableDatalist, {
      props: {
        name: "testName",
        label: "Test Label",
        optionsList: ["Option 1", "Option 2", "Option 3"],
        zIndex: "z-3",
        validationFun: validatorMock
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
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.form-label').text()).toContain('Test Label');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Type to search...');
  });

  it('filters options debounced', async () => {
    jest.useFakeTimers();
    // Simulate typing quickly
    const input = wrapper.find('input');
    await input.setValue('Option');
    await input.trigger('input');

    let options = wrapper.findAll('.option');
    expect(options.length).toBe(3); 

    jest.advanceTimersByTime(200); 

    // Update wrapper after debounce
    await nextTick();
   
    options = wrapper.findAll('.option');
    expect(options.length).toBe(3); // Both options should still be visible after debounce

    jest.useRealTimers(); // Restore real timers after test
  });

  it("selects an option from the datalist", async () => {
    const input = wrapper.find("input");
    input.element.value = "Option 2";
    await input.trigger("input");

    expect(input.element.value).toBe("Option 2");
  });

  it('validates input based on validator function', async () => {
    jest.useFakeTimers();

    // Simulate typing and trigger input event
    const input = wrapper.find('input');
    await input.setValue('Option');
    await input.trigger('input');
    jest.advanceTimersByTime(200); 

    await nextTick();
    // Assert validation result
    expect(validatorMock).toHaveBeenCalledWith('Option');
    expect(input.classes()).toContain('is-valid'); // Assuming you have a class for valid inputs
    jest.useRealTimers();
  });

  it("shows datalist when input is clicked", async () => {
    const input = wrapper.find("input");
    await input.trigger("click");

    const datalist = wrapper.find(".datalist");
    expect(datalist.isVisible()).toBe(true);
  });

  it("hides datalist when clicking outside", async () => {
    const input = wrapper.find("input");
    await input.trigger("click");

    document.body.click();
    const datalist = wrapper.find(".datalist");
    expect(datalist.isVisible()).toBe(false);
  });
});
