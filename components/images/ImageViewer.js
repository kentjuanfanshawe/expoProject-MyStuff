import { StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  onPress,
}) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    paddingVertical: 20,
    marginVertical: 20,
  },
});
