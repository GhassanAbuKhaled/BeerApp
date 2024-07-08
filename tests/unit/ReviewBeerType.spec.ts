import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import ReviewBeerType from "@/components/review/ReviewBeerType.vue";
import { nextTick } from "vue";
import getBeerTypes from "@/services/reviewServices";

// Mock getBeerTypes function
jest.mock('@/services/reviewServices', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  
const mockGetBeerTypes = getBeerTypes as jest.Mock;

describe("ReviewBeerType.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(ReviewBeerType);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders correctly initially", () => {
    // Check initial rendering
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches and updates optionsList on mount", async () => {
    // Mock a successful response for getBeerTypes
    mockGetBeerTypes.mockResolvedValue({
        beers: [{ id: 1, name: "Bitburger Pils" }, { id: 2, name: "Gaffel Kölsch" }, { id: 3, name: "Veltins Pilsener" }],
      });
    // Wait for data to be fetched
    await wrapper.vm.fetchBeersTypes();
    await nextTick();

    // Assert optionsList has been updated
    const optionsList = wrapper.vm.optionsList;
    
    expect(optionsList).toEqual(["Bitburger Pils", "Gaffel Kölsch", "Veltins Pilsener"]);
  });
});
