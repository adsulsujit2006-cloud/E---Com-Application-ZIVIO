import React from "react"; 
import DrawerList from "../../component/DrawerList"; 
import { 
    AccountBox, 
    Add, 
    Category, 
    Dashboard, 
    ElectricBolt, 
    Home, 
    IntegrationInstructions, 
    LocalOffer, 
    Logout 
} from "@mui/icons-material"; 


const menu = [ 
    { 
        name: "Dashboard", 
        path: "/admin", 
        icon: <Dashboard className="gray-700" />, 
        activeIcon: <Dashboard className="text-white" /> 
    }, 

    { 
        name: "Coupons", 
        path: "/admin/coupon", // fixed: was "/coupon", now consistent with route nesting under /admin
        icon: <IntegrationInstructions className="gray-700" />, 
        activeIcon: <IntegrationInstructions className="text-white" /> 
    }, 

    { 
        name: "Add New Coupan", 
        path: "/admin/add-coupan", 
        icon: <Add className="gray-700" />, 
        activeIcon: <Add className="text-white" /> 
    }, 

    { 
        name: "Home Page", 
        path: "/admin/home-grid", 
        icon: <Home className="gray-700" />, 
        activeIcon: <Home className="text-white" /> 
    }, 

    { 
        name: "Electronics Category", 
        path: "/admin/electronics-category", 
        icon: <ElectricBolt className="gray-700" />, 
        activeIcon: <ElectricBolt className="text-white" /> 
    }, 

    { 
        name: "Shop by Category", 
        path: "/admin/shop-by-category", 
        icon: <Category className="gray-700" />, 
        activeIcon: <Category className="text-white" /> 
    }, 

    { 
        name: "Deals", 
        path: "/admin/deals", 
        icon: <LocalOffer className="gray-700" />, 
        activeIcon: <LocalOffer className="text-white" /> 
    } 
]; 

const menu2 = [ 
    { 
        name: "Account", 
        path: "/seller/account", 
        icon: <AccountBox className="gray-700" />, 
        activeIcon: <AccountBox className="text-white" /> 
    }, 

    { 
        name: "Logout", 
        path: "/", 
            icon: <Logout className="gray-700" />, 
        activeIcon: <Logout className="text-white" /> 
    } 
]; 

const AdminDrawerList = ({ toggleDrawer }: any) => { 
    return ( 
        <DrawerList 
            menu={menu} 
            menu2={menu2} 
            toggleDrawer={toggleDrawer} 
        /> 
    ); 
}; 

export default AdminDrawerList;