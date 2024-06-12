import React, { useEffect, useState } from "react";
import {
  Avatar,
  Flex,
  Tooltip,
  Typography,
  Popover,
  Tabs,
  Badge,
  Button,
} from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import Gear from "../../assets/icons/Gear";
import Bell from "../../assets/icons/Bell";
import { trimString } from "../../services/helpers";
import { useAuthStore } from "../../stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { UserRound } from "lucide-react";
import { baseURL } from "../../configs/axiosConfig";

const { Text } = Typography;

const Navbar = ({ isOpened, setOpened }) => {
  const [pageName, setPageName] = useState("");
  const { pathname } = useLocation();

  const {user} = useAuthStore(useShallow((state) => state));

  useEffect(() => {
    // ? setting the current page dynamically
    let currentPage = pathname?.split("/");
    currentPage = currentPage[currentPage.length - 1];
    currentPage = currentPage.replace("-", " ");
    setPageName(currentPage);
  }, [pathname]);

  return (
    <Flex justify="space-between" align="center" className="w-100 navbar">
      <Flex
        align="center"
        justify="start"
        gap={16}
        style={{
          padding: "16px",
        }}
      >
        <RxHamburgerMenu
          onClick={() => setOpened(!isOpened)}
          className="menu-icon"
        />
        <Text className="page-name">{pageName}</Text>
      </Flex>

      {/* // ? navbar right side  */}
      <Flex
        justify="space-between"
        align="center"
        gap={10}
        className="proflie-box py-1"
      >
        {/* // ? avatar and username */}
        <Flex align="center">
          {user?.userData?.profilePic ? (
            <Avatar
            src={baseURL+user?.userData?.profilePic}
            className="avatar"
          />) : (
            <Avatar icon={<UserRound />} className="avatar" />
          )}
          <Tooltip title="Zubair Arif" className="username-tooltip">
            <Text className="user-name">{trimString(user?.userData?.name)}</Text>
          </Tooltip>
        </Flex>
        <Flex>
          {/* // ? notifications and settings */}
          <Flex gap={16} className="notifications-and-settings">
            <Popover
              content={NotificationsPopover}
              trigger="click"
              placement="bottom"
            >
              <Flex className="cursor-pointer">
                <Bell />
              </Flex>
            </Popover>
            <Gear />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const NotificationsPopover = () => {
  const onChange = (key) => {
    // console.log(key);
  };

  const RequestNotification = () => {
    return (
      <Flex vertical className="request-notifications" gap={10}>
        <Text className="notifications-time">Today</Text>
        <Flex
          className="request-notification unread"
          gap={8}
          align="flex-start"
        >
          <Avatar
            size={56}
            src="https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs"
          />

          <Flex vertical gap={10} className="notification-content">
            <Flex vertical>
              <Flex className="username-and-timestamp" gap={6}>
                <Text className="username">John Doe</Text>
                <Text className="notification-timestamp">9:30 am</Text>
              </Flex>
              <Text className="notification-description">
                John Doe requested to register account.
              </Text>
            </Flex>
            <Flex justify="space-between" gap={8} className="link-and-btns">
              <Flex className="btns" gap={6}>
                <Button className="primary-btn">Accept</Button>
                <Button className="danger-btn">Reject</Button>
              </Flex>
              <Link
                to={""}
                className="d-flex justify-content-center text-center view-details-btn"
              >
                View Detail
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const GeneralNotification = () => {
    return (
      <Flex vertical className="request-notifications" gap={10}>
        <Text className="notifications-time">Today</Text>
        {[1, 2, 3]?.map((item) => (
          <Flex
            className={`request-notification${item !== 3 ? " unread" : ""}`}
            gap={8}
            key={item}
            align="flex-start"
          >
            <Avatar
              size={56}
              src="https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs"
            />

            <Flex vertical gap={10} className="notification-content">
              <Flex vertical>
                <Flex className="username-and-timestamp" gap={6}>
                  <Text className="username">Transaction Update</Text>
                  <Text className="notification-timestamp">9:30 am</Text>
                </Flex>
                <Text className="notification-description">
                  John Doe has made a transaction.
                </Text>
              </Flex>
              <Flex justify="flex-end" className="link-and-btns">
                <Link
                  to={""}
                  className="d-flex justify-content-center text-center view-details-btn"
                >
                  View Detail
                </Link>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  };

  const items = [
    {
      key: "1",
      label: (
        <Badge count={2} offset={[15, 8]}>
          General{" "}
        </Badge>
      ),
      children: <GeneralNotification />,
    },
    {
      key: "2",
      label: (
        <Badge count={1} offset={[15, 8]}>
          Request{" "}
        </Badge>
      ),
      children: <RequestNotification />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="2"
      items={items}
      onChange={onChange}
      className="notification-tabs"
    />
  );
};

export default Navbar;
