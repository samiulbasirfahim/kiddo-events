import * as ImagePicker from "expo-image-picker";

export async function imagePicker(
    cb: (uri: string | null) => void,
    {
        editable = true,
        multiple = false,
    }: {
        editable?: boolean;
        multiple?: boolean;
    },
) {
    const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        cb(null);
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: multiple,
        allowsEditing: editable,
        aspect: [1, 1],
        quality: 0.5,
    });

    if (!result.canceled) {
        cb(result.assets[0].uri);
    } else {
        cb(null);
    }
}
