import create from "zustand";

interface SearchModalState {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const useSearchModalStore = create<SearchModalState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

export default useSearchModalStore;
