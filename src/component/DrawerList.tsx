import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
    name: string;
    path: string;
    icon: any;
    activeIcon: any;
}

interface DrawerListProps {
    menu: MenuItem[];
    menu2: MenuItem[];
    toggleDrawer: () => void;
}

const DrawerList = ({
    menu,
    menu2,
    toggleDrawer,
}: DrawerListProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        navigate(path);
        toggleDrawer();
    };

    return (
        <div className="h-full">
            <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">

                <div>
                    <div className="space-y-2">

                        {
                            menu.map((item, index: number) => (
                                <div onClick={()=>handleClick(item.path)}
                                    className="pr-5 cursor-pointer"
                                    key={index}
                                >
                                    <div
                                        className={`
                                            flex items-center
                                            px-5 py-3
                                            rounded-r-full
                                            transition-all duration-200
                                            ${
                                                item.path === location.pathname
                                                    ? "bg-gray-500 text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }
                                        `}
                                    >
                                        <ListItemIcon
                                            className={`
                                                min-w-[40px]
                                                ${
                                                    item.path === location.pathname
                                                        ? "text-white"
                                                        : "text-gray-600"
                                                }
                                            `}
                                        >
                                            {item.path === location.pathname
                                                ? item.activeIcon
                                                : item.icon}
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={item.name}
                                            primaryTypographyProps={{
                                                className: "font-medium",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <Divider />
                    <div className="pt-56">
                        <div className="space-y-2 ">

                        {
                            menu2.map((item, index: number) => (
                                <div onClick={()=>handleClick(item.path)}
                                    className="pr-5 cursor-pointer"
                                    key={index}
                                >
                                    <div
                                        className={`
                                            flex items-center
                                            px-5 py-3
                                            rounded-r-full
                                            transition-all duration-200
                                            ${
                                                item.path === location.pathname
                                                    ? "bg-gray-500 text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }
                                        `}
                                    >
                                        <ListItemIcon
                                            className={`
                                                min-w-[40px]
                                                ${
                                                    item.path === location.pathname
                                                        ? "text-white"
                                                        : "text-gray-600"
                                                }
                                            `}
                                        >
                                            {item.path === location.pathname
                                                ? item.activeIcon
                                                : item.icon}
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={item.name}
                                            primaryTypographyProps={{
                                                className: "font-medium",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    
                </div>

            </div>
        </div>
                    </div>
    );
};

export default DrawerList;