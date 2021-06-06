

export const useProductData=()=>{
    const brands= [
    {
        name: 'aFe Power',
        image: ''
    },
    {
        name: 'American Off-Road',
        image: ''
    },
    {
        name: 'ARB',
        image: ''
    },
    {
        name: 'AuxBean',
        image: ''
    },
    {
        name: 'Bestop',
        image: ''
    },
    {
        name: 'Borla',
        image: ''
    },
    {
        name: 'EFS',
        image: ''
    },
    {
        name: 'FlexoPower',
        image: ''
    },
    {
        name: 'Front Runner',
        image: ''
    },
    {
        name: 'Fuel Rims',
        image: ''
    },
    {
        name: 'Hi-Lift',
        image: ''
    },
    {
        name: 'IndeFlate',
        image: ''
    },
    {
        name: 'KC Hilites',
        image: ''
    },
    {
        name: 'Marlow',
        image: ''
    },
    {
        name: 'MAXTRAX',
        image: ''
    },
    {
        name: 'Mickey Thompson',
        image: ''
    },
    {
        name: 'Osram',
        image: ''
    },
    {
        name: 'Outland Automotive',
        image: ''
    },
    {
        name: 'Piranha Offroad',
        image: ''
    },
    {
        name: 'Pro Comp',
        image: ''
    },
    {
        name: 'Quick Pitch',
        image: ''
    },
    {
        name: 'Rhino Rack',
        image: ''
    },
    {
        name: 'Rougn Country',
        image: ''
    },
    {
        name: 'Rugged Ridge',
        image: ''
    },
    {
        name: 'Salwan Custom',
        image: ''
    },
    {
        name: 'SecureTech',
        image: ''
    },
    {
        name: 'Smart Signal',
        image: ''
    },
    {
        name: 'Smittybilt',
        image: ''
    },
    {
        name: 'Spidertrax',
        image: ''
    },
    {
        name: 'Superwinch',
        image: ''
    },
    {
        name: 'Tentco',
        image: ''
    },
    {
        name: 'Thule',
        image: ''
    },
    {
        name: 'Viair',
        image: ''
    },
    {
        name: 'Wheeler Whip',
        image: ''
    },
    {
        name: 'Wolf Offroad',
        image: ''
    },
    {
        name: 'Yakima',
        image: ''
    }
    ]

    const categories=  [
            {
                main : 'Body_/_Exterior',
                subCategories: ['Bull Bars', 'Covers', 'Doors', 'Fenders_/_Flares', 'Flags', 'Front Bumpers', 'Hoods', 'Mirrors_/_Trim Pieces', 'Rear Bumpers_/_Tire Carriers', 'Side Steps', 'Skid Plates', 'Tow Hooks_/_Recovery Points', 'Trailer Carriers']
            },
            {
                main : 'Camping',
                subCategories: ['Awning Mounts', 'Awnings_/_Rooms', 'Cooking Equipment', 'Drawer Systems', 'Furniture_/_Grills', 'Rack Accessories', 'Showers', 'Storage', 'Tent Mounts', 'Tents', 'Water Tanks']
            },
            {
                main: 'Engine',
                subCategories: ['Air Filters', 'Air Intakes', 'Axle Accessories', 'Driveshafts', 'Exhaust', 'Throttle Body Spacers', 'Tuning Modules']
            },
            {
                main: 'Equipment',
                subCategories: ['Bike Carriers', 'Compressors_/_Deflators', 'Miscellaneous Carriers', 'Straps', 'Tools']
            },
            {
                main: 'Interior',
                subCategories: ['Accessories', 'Floor Liners_/_Carpets', 'Rollcage Accessories', 'Seat Covers', 'Switches_/_Switch Pods', 'Trim Pieces']
            },
            {
                main: 'Lighting',
                subCategories: ['Grilles_/_Trim Pieces', 'Halogen_/_HD', 'LED Bars', 'LED Pods', 'Mounting Bracketry', 'Other Lights']
            },
            {
                main: 'Power',
                subCategories: ['Dual Battery Systems', 'Switches', 'Wiring Kits']
            },
            {
                main: 'Recovery',
                subCategories: ['Hi-Lift_/_Jacks', 'Hi-Lift Accessories', 'Hi-Lift Mounts', 'Ropes', 'Shackles', 'Traction Device Mounts', 'Traction Devices', 'Winch Accessories', 'Winch Plates_/_Mounts', 'Winches']
            },
            {
                main: 'Roof Racks',
                subCategories: ['Load Bar Mounts', 'Load Bars', 'Rack Mounts_/_Legs', 'Roof Rack Kits']
            },
            {
                main: 'Suspension',
                subCategories: ['Bushings', 'Control Arms_/_Brackets', 'Leveling Kits', 'Lift Kits', 'Shackles_/_Spacers', 'Shock Absorbers', 'Springs', 'Steering Stabilizers', 'Track_/_Sway Bars']
            },
            {
                main: 'Towing',
                subCategories: ['Hitch Attachments', 'Tow Bars_/_Hitch Receivers']
            },
            {
                main: 'Wheels',
                subCategories: ['Brakes', 'Legs_/_Nuts', 'Spacers', 'Tire Pressure Devices']
            }
        ]
    
     return { brands, categories};
}

export const useSelectOption=()=>{
    const rowsPerPageOptions= [
        {key1: '15', key2: '15 Products per page'},
        {key1: '30', key2: '30 Products per page'},
        {key1: '45', key2: '45 Products per page'},
        {key1: '60', key2: '15 Products per page'}
    ]

    const productSortOption= [
        {key1: 'latest', key2: 'Sort by latest'},
        {key1: 'ascending', key2: 'Sort by price: Low to High'},
        {key1: 'descending', key2: 'Sort by price: High to Low'},
        {key1: 'sales', key2: 'Sales'},

    ]

    const orderStatusOptions= [
            {key1: 'allOrders', key2: 'All orders'},
            {key1: 'inProgress', key2:'In progress'},
            {key1: 'shipped', key2: 'Shipped'},
            {key1: 'delivered', key2: 'Delivered'}
    ]

    const brandOptions= useProductData().brands.map(brand=>{
        return {key1: brand.name, key2: brand.name}
    })
    const allBrandOptions=[{key1: '', key2: 'All Brands'}, ...brandOptions]

   const categoryOptions= useProductData().categories.map(category=>{
       return { key1: category.main, key2: category.main.split('_').join(' ')}
   })
   const allCategoryOptions=[{key1: '', key2:'All Categories'}, ...categoryOptions]
    return {rowsPerPageOptions, productSortOption, orderStatusOptions, allBrandOptions, allCategoryOptions}
}

// export default useData;