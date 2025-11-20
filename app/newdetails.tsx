import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Pressable, 
  TextInput, 
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {useComments} from "./hooks/useComments";
import { useThemeColor } from "@/hooks/useThemeColor";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function NewDetail() {
  const { NewsItem } = useLocalSearchParams<{ NewsItem: string }>();
  const [commentText, setCommentText] = useState("");
  
  const {postMessage, error} = useComments()

  if (!NewsItem) return null;
  const data = JSON.parse(NewsItem);
 

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date).replace('.', '').toUpperCase(); 
  };

  const colors = useThemeColor()
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      
      <Stack.Screen options={{ headerShown: false }} />
      
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${data.image}` }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>

        <View style={[styles.sheetContainer, {backgroundColor: colors.background}]}>
          
          <View style={styles.headerContent}>
            <View style={[styles.dateBadge, {backgroundColor: colors.darklight}]}>
              <Text style={styles.dateText}>{formatDate(data.date)}</Text>
            </View>
            <Text style={[styles.title, {color: colors.text}]}>{data.title}</Text>
          </View>

          <Text style={[styles.textContent, {color: colors.secondary}]}>{data.content}</Text>
          
          <View style={styles.divider} />

          <View style={styles.commentsSection}>
            <View style={styles.commentsHeaderRow}>
              <Text style={[styles.sectionTitle, {color: colors.text}]}>Comentarios</Text>
              <View style={styles.commentCountBadge}>
                <Text style={styles.commentCountText}>{data.comments?.length || 0}</Text>
              </View>
            </View>

            <View style={styles.commentsList}>
              {Array.isArray(data.comments) && data.comments.length > 0 ? (
                data.comments.map((comment: any) => (
                  <View key={comment._id} style={styles.commentCard}>
                    <Image 
                      source={{ uri: comment.user?.avatar || "https://i.pravatar.cc/150" }} 
                      style={styles.avatar} 
                    />

                    <View style={{ flex: 1 }}>
                      <View style={styles.commentUserRow}>
                        <Text style={[styles.commentUser, {color: colors.text}]}>
                          {comment.user?.name || "Usuario"}
                        </Text>

                        <Text style={[styles.commentTime, {color: colors.secondary}]}>
                          {new Date(comment.createdAt).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </Text>
                      </View>

                      <Text style={[styles.commentText, {color: colors.secondary}]}>{comment.text}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ color: "#999", fontSize: 14 }}>
                  No hay comentarios todavía...
                </Text>
              )}
            </View>


            <View style={styles.inputContainer}>
              <Image 
                source={{ uri: "https://i.pravatar.cc/150?img=12" }} // Avatar del usuario actual
                style={styles.myAvatar} 
              />
              <View style={[styles.inputWrapper, {backgroundColor: colors.darklight}]}>
                <TextInput
                  placeholder="Escribe un comentario..."
                  placeholderTextColor="#999"
                  style={styles.textInput}
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                />
                <Pressable style={styles.sendButton}>
                  <Ionicons  onPress={() => { postMessage(data._id, commentText); setCommentText("");}} name="send" size={18} color="#D98E32" />
                </Pressable>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  // --- Imagen Header ---
  imageContainer: {
    height: 350,
    width: "100%",
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)', // Oscurece un poco la imagen
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // --- Contenedor Hoja ---
  sheetContainer: {
    marginTop: -40, // Sube sobre la imagen
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 24,
    paddingTop: 30,
    minHeight: 500,
  },

  // --- Header Noticia ---
  headerContent: {
    marginBottom: 20,

  },
  dateBadge: {
    backgroundColor: "#FFF8F0", // Fondo naranja muy clarito
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D98E32", // Naranja Ocre
    letterSpacing: 0.5,
    fontFamily: "CormorantUnicaseBold",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",                                                                                    
    color: "#1a1a1a",
    lineHeight: 32,
    letterSpacing: -0.5,
    fontFamily: "CormorantUnicaseBold",
  },

  // --- Cuerpo Texto ---
  textContent: {
    fontSize: 17,
    color: "#4a4a4a",
    lineHeight: 28,                                                                                                                 
    fontWeight: "400",
    fontFamily: "CormorantUnicaseBold",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 30,
  },

  // --- Sección Comentarios ---
  commentsSection: {
    marginBottom: 20,
  },
  commentsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    //fontWeight: "700",
    color: "#1a1a1a",
    fontFamily: "CormorantUnicaseBold",
    
  },
  commentCountBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  commentCountText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
  },
  
  // --- Lista Comentarios ---
  commentsList: {
    gap: 20,
    marginBottom: 25,
  },
  commentCard: {
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  commentUserRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 15,
    fontFamily: "CormorantUnicaseBold",
    fontWeight: "600",
    color: "#333",
  },
  commentTime: {
    fontSize: 12,
    color: "#999",
        fontFamily: "CormorantUnicaseBold",

  },
  commentText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
        fontFamily: "CormorantUnicaseBold",

  },

  // --- Input Comentario ---
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end", // Alineado abajo para cuando crece el input
    gap: 12,
  },
  myAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eee",
    marginBottom: 4,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8, // Padding interno
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    maxHeight: 80, // Limite de altura
    paddingTop: 5, 
    paddingBottom: 5,
    fontFamily: "CormorantUnicaseBold",

  },
  sendButton: {
    marginLeft: 10,
    padding: 5,
  },
});