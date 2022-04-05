import { Icon, MenuItem } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface MenuItemLinkProps {
    title: string;
    icon: IconType;
    href: string;
}

export function MenuItemLink({ title, icon, href }: MenuItemLinkProps) {
    const { asPath } = useRouter();
    let isActive = false;

    if (asPath === href) {
        isActive = true;
    }

    return (
        <Link href={href} passHref>
            <MenuItem
                icon={<Icon as={icon} />}
                color={isActive ? "black" : "white"}
                _hover={{
                    bg: "gray.400"
                }}
            >
                {title}
            </MenuItem>
        </Link>
    )
}