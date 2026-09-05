
import { Dashboard } from "@mui/icons-material";
import React from "react";
interface MenuItem{
     
                name: string,
                path: string,
                icon: any,
                activeIcon : any
    
            
}

interface DrawerListProps {
    menu: MenuItem[];
    menu2: MenuItem[];
    toggleDrawer: () => void;
}

const DrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {
    return (
        <div className="h-full">
            <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">

                <div>
                    <div className="space-y-2">

                    </div>
                </div>

            </div>
        </div>
    );
};

export default DrawerList;