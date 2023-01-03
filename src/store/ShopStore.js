import create from 'zustand';

export const useShopStore = create((set)=>({
    storeDistance: 0,
    storeFound: false,
    isStoreLoading : false,
    storeData : {},
    setStoreDistance : (payload) => set((state)=> ({ storeDistance : payload})),
    setIsStoreLoading : (payload) => set((state)=>({isStoreLoading: payload})),
    setStoreFound : (payload) => set((state)=> ({storeFound : payload})),
    setStoreData : (payload) => set((state)=> ({storeData : payload}))
}))