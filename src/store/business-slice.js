import { createSlice } from '@reduxjs/toolkit';
const initialBusiness = {
    items: []
}
const BusinessSlice = createSlice(
    {
        name: 'Business',
        initialState: initialBusiness,
        reducers: {
            addBusiness(state, action) {
                const newItem = action.payload;
                const existingItem = state.items.find(item => item.id === newItem.id);
                if (existingItem) {
                    existingItem.id = newItem.id;
                    existingItem.company_name = newItem.company_name;
                    existingItem.website = newItem.website;
                    existingItem.address = newItem.address;
                    existingItem.city = newItem.city;
                    existingItem.province = newItem.province;
                    existingItem.postal_code = newItem.postal_code;
                    existingItem.image = newItem.image;
                    existingItem.hours = newItem.hours;
                }
                else {
                    state.items.push(
                        {
                            id: newItem.id,
                            company_name: newItem.company_name,
                            website: newItem.website,
                            address: newItem.address,
                            city: newItem.city,
                            province: newItem.province,
                            postal_code: newItem.postal_code,
                            image: newItem.image,
                            hours: newItem.hours,
                        });
                }
            },
            removeBusiness(state, action) {
                const id = action.payload;
                const existingItem = state.items.find(item => item.id === id);
                if (existingItem) {
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
        }
    }
);
export const { addBusiness, removeBusiness } = BusinessSlice.actions;
export default BusinessSlice.reducer