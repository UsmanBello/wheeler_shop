

const useData=()=>{
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

export default useData;