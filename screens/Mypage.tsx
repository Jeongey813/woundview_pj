import * as React from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Color,
  FontFamily,
  Border,
  FontSize,
  Gap,
  Padding,
} from "../GlobalStyles";

const Mypage = () => {
  const navigation = useNavigation() as any;
  
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState({
    name: "한승연",
    email: "hansy@example.com",
    phone: "010-1234-5678",
    profileImage: require("../assets/user-1.png")
  });

  const menuItems = [
    {
      id: 1,
      title: "프로필 정보",
      icon: "👤",
      onPress: () => console.log("프로필 정보")
    },
    {
      id: 2,
      title: "공지사항",
      icon: "📢",
      onPress: () => console.log("공지사항")
    },
    {
      id: 3,
      title: "알림설정",
      icon: "🔔",
      onPress: () => console.log("알림설정")
    },
    {
      id: 4,
      title: "약관 및 정책",
      icon: "📋",
      onPress: () => console.log("약관 및 정책")
    },
    {
      id: 5,
      title: "의학정보출처",
      icon: "📚",
      onPress: () => console.log("의학정보출처")
    },
    {
      id: 6,
      title: "서비스문의",
      icon: "💬",
      onPress: () => console.log("서비스문의")
    },
    {
      id: 7,
      title: "버전정보",
      icon: "ℹ️",
      onPress: () => console.log("버전정보")
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingTop: 30}}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <View style={styles.profileInfoRow}>
          <View style={styles.profileInfoLeft}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userEmail}>{userInfo.email}</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>편집</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 알림 설정 */}
      <View style={styles.settingsSection}>
        <View style={styles.settingItem}>
          <Text style={styles.settingTitle}>푸시 알림</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Color.colorLightgray, true: Color.colorMediumseagreen100 }}
            thumbColor={Color.bgFooter}
          />
        </View>
      </View>

      {/* 메뉴 목록 */}
      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 로그아웃 버튼 */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      </View>
      {/* 하단 네비게이션 */}
      <View style={[styles.navigation, styles.actionAreaFlexBox, { height: 100 }]}> 
        <TouchableOpacity 
          style={[styles.navItems, styles.navFlexBox1]}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            style={[styles.home2Icon, styles.iconLayout]}
            source={require("../assets/home-2.png")}
          />
          <Text style={styles.text11}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItems1, styles.navFlexBox1]}
          onPress={() => navigation.navigate("Timelinemain")}
        >
          <Image
            style={[styles.timelineIcon, styles.iconLayout]}
            source={require("../assets/timeline.png")}
          />
          <Text style={styles.text11}>타임라인</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItems2, styles.navFlexBox]}
          onPress={() => navigation.navigate("Community")}
        >
          <Image
            style={[styles.timelineIcon, styles.iconLayout]}
            source={require("../assets/community.png")}
          />
          <Text style={styles.text11}>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItems3, styles.navFlexBox]}
          onPress={() => navigation.navigate("Mypage")}
        >
          <Image
            style={styles.user1Icon}
            source={require("../assets/user-1.png")}
          />
          <Text style={styles.text11}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bgFooter,
    // Remove any bottom padding or margin that could cause a gap
  },
  profileSection: {
    padding: 30,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: Color.bgFooter,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightgray,
    marginTop: 30, // move white background up by 30px
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  profileInfoLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 29, // 24 + 5
    fontWeight: "bold",
    color: Color.colorBlack,
    marginBottom: 2,
    fontFamily: FontFamily.interBold,
    textAlign: 'left',
  },
  userEmail: {
    fontSize: 16,
    color: Color.colorDarkslategray100,
    fontFamily: FontFamily.interMedium,
    textAlign: 'left',
  },
  userPhone: {
    fontSize: 16,
    color: Color.colorDarkslategray100,
    fontFamily: FontFamily.interMedium,
  },
  editProfileButton: {
    backgroundColor: Color.colorMediumseagreen100,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: Border.br_10,
  },
  editProfileText: {
    color: Color.bgFooter,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
  settingsSection: {
    backgroundColor: Color.bgFooter,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightgray,
    marginLeft: 12,
    marginRight: 12,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
  },
  menuSection: {
    backgroundColor: Color.bgFooter,
    marginLeft: 12,
    marginRight: 12,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightgray,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
  },
  menuArrow: {
    fontSize: 18,
    color: Color.colorDarkslategray100,
    fontFamily: FontFamily.interMedium,
  },
  logoutSection: {
    padding: 20,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: Color.bgFooter,
  },
  logoutButton: {
    backgroundColor: Color.colorMediumseagreen100,
    paddingVertical: 12,
    borderRadius: Border.br_10,
    alignItems: "center",
  },
  logoutText: {
    color: Color.bgFooter,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: Color.bgFooter,
    borderTopWidth: 1,
    borderTopColor: Color.colorLightgray,
    marginTop: 65, // navigation and gray line moved down by 20px
    // Remove any bottom margin or padding here as well
  },
  navItem: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: Color.colorMediumseagreen100,
    borderRadius: Border.br_10,
  },
  navText: {
    fontSize: 12,
    color: Color.colorDarkslategray100,
    fontFamily: FontFamily.interMedium,
  },
  activeNavText: {
    color: Color.bgFooter,
    fontWeight: "600",
  },
  actionAreaFlexBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: Color.bgFooter,
    borderTopWidth: 1,
    borderTopColor: Color.colorLightgray,
  },
  navFlexBox1: {
    gap: 2,
    alignItems: "center",
  },
  iconLayout: {
    overflow: "hidden",
    alignSelf: "stretch",
    maxWidth: "100%",
    width: "100%",
  },
  navFlexBox: {
    gap: 3,
    alignItems: "center",
  },
  home2Icon: {
    height: 41,
  },
  timelineIcon: {
    height: 45,
  },
  user1Icon: {
    width: 40,
    height: 40,
  },
  navItems: {
    width: 41,
    marginTop: -10,
  },
  navItems1: {
    width: 45,
    marginTop: -10,
  },
  navItems2: {
    width: 45,
    marginTop: -10,
  },
  navItems3: {
    width: 56,
    marginTop: -10,
  },
  text11: {
    fontSize: 12,
    color: Color.colorDarkslategray100,
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textTransform: "uppercase",
    alignSelf: "stretch",
  },
});

export default Mypage; 