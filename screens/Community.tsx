import * as React from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, TextInput, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Color,
  FontFamily,
  Border,
  FontSize,
  Gap,
  Padding,
} from "../GlobalStyles";

const Community = () => {
  const navigation = useNavigation() as any;
  
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      author: "김상처",
      title: "이 상처는 어떻게 치료해야 할까요?",
      content: "3일 전에 넘어져서 생긴 상처인데, 계속 아프고 빨갛게 부어있어요. 어떻게 치료하면 좋을까요?",
      image: require("../assets/images-1-1.png"),
      likes: 12,
      comments: 8,
      time: "2시간 전"
    },
    {
      id: 2,
      author: "이치료",
      title: "화상 치료 후 흉터 관리법",
      content: "화상 치료를 받고 나서 흉터가 생겼는데, 흉터 관리에 좋은 방법이 있을까요?",
      image: require("../assets/images-1-1.png"),
      likes: 25,
      comments: 15,
      time: "5시간 전"
    },
    {
      id: 3,
      author: "박상처",
      title: "수술 후 상처 관리 팁",
      content: "수술 후 상처 관리에 도움이 되는 팁들을 공유해드릴게요!",
      image: require("../assets/images-1-1.png"),
      likes: 18,
      comments: 12,
      time: "1일 전"
    }
  ]);

  const [newPost, setNewPost] = React.useState({
    title: "",
    content: "",
    image: null
  });

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>커뮤니티</Text>
        <TouchableOpacity style={styles.writeButton}>
          <Text style={styles.writeButtonText}>글쓰기</Text>
        </TouchableOpacity>
      </View>

      {/* 게시글 목록 */}
      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.postCard} onPress={() => console.log(`게시글 ${post.id} 상세보기`)}>
            {/* 작성자 정보 */}
            <View style={styles.authorInfo}>
              <View style={styles.authorAvatar}>
                <Text style={styles.authorInitial}>{post.author[0]}</Text>
              </View>
              <View style={styles.authorDetails}>
                <Text style={styles.authorName}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>

            {/* 게시글 내용 */}
            <View style={styles.postContent}>
              <Text style={styles.postText}>{post.content}</Text>
              {post.image && (
                <Image source={post.image} style={styles.postImage} />
              )}
              <View style={styles.postActionsCustom}>
                <View style={styles.answerButton}><Text style={styles.answerButtonText}>답변완료</Text></View>
                <Text style={styles.infoText}>25.07.12</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 하단 네비게이션 */}
      <View style={styles.navigationLine} />
      <View style={styles.navigation}>
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
    marginTop: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 65, // was 55, increased by 10px
    backgroundColor: Color.bgFooter,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Color.colorBlack,
    fontFamily: FontFamily.interBold,
    marginLeft: 20,
  },
  writeButton: {
    backgroundColor: Color.colorMediumseagreen100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Border.br_10,
    marginRight: 10,
  },
  writeButtonText: {
    color: Color.bgFooter,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
  postsContainer: {
    padding: 10,
    paddingTop: 0,
  },
  postCard: {
    backgroundColor: Color.bgFooter,
    borderRadius: Border.br_10,
    padding: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 20,
    overflow: 'visible',
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Color.colorMediumseagreen100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  authorInitial: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.bgFooter,
    fontFamily: FontFamily.interBold,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
  },
  postTime: {
    fontSize: 12,
    color: Color.colorGray600,
    fontFamily: FontFamily.interMedium,
  },
  postContent: {
    marginBottom: 4,
    marginTop: 10,
  },
  postText: {
    fontSize: 12,
    color: Color.colorBlack,
    lineHeight: 16,
    marginBottom: 2,
    fontFamily: FontFamily.interMedium,
    marginTop: 0,
  },
  postImage: {
    width: "50%",
    height: 50,
    borderRadius: Border.br_10,
    resizeMode: "cover",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: Color.colorLightgray,
    paddingTop: 5,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  actionText: {
    fontSize: 14,
    color: Color.colorGray600,
    fontFamily: FontFamily.interMedium,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: Color.bgFooter,
    marginTop: 5, // navigation and gray line moved down by 40px
  },
  navigationLine: {
    borderTopWidth: 1,
    borderTopColor: Color.colorLightgray,
    marginTop: 35, // 40px - 5px = 35px, so the line is 5px above the nav bar
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
    color: Color.colorGray600,
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
  postActionsCustom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Color.colorLightgray,
    paddingTop: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    minHeight: 28,
  },
  infoText: {
    fontSize: 16,
    color: Color.colorGray100,
    fontFamily: FontFamily.interMedium,
    fontWeight: '700',
  },
  answerButton: {
    backgroundColor: Color.colorGray200,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerButtonText: {
    color: Color.bgFooter,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: FontFamily.interMedium,
  },
});

export default Community; 