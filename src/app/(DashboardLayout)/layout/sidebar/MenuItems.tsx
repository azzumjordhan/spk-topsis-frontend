import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import {
  IconAperture,
  IconCategory,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconPresentation,
  IconScoreboard,
  IconTypography,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Menu",
  },
  {
    id: uniqueId(),
    title: "Admin",
    icon: AdminPanelSettingsOutlined,
    href: "/user",
  },
  {
    id: uniqueId(),
    title: "Karyawan",
    icon: IconUser,
    href: "/karyawan",
  },
  {
    id: uniqueId(),
    title: "Criteria",
    icon: IconCategory,
    href: "/criteria",
  },
  {
    id: uniqueId(),
    title: "Scores",
    icon: IconScoreboard,
    href: "/scores",
  },
  {
    id: uniqueId(),
    title: "Evaluasi",
    icon: IconPresentation,
    href: "/evaluasi",
  },
];

export default Menuitems;
