import React, { Fragment, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ImageInputList from "../components/ImageInputList";
import Spacer from "../components/Spacer";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

type ImageInfo = ImagePicker.ImageInfo;

const getImageType = (uri) => {
  const type = "image";
  const ext = uri.slice(-4);

  if (ext.match(/.[a-z]{3,4}$/)) {
    return `${type}/${ext.slice(1)}`;
  } else {
    return `${type}/jpg`;
  }
};

const buildImageObj = (imageObj: ImageInfo) => {
  const { uri, type, ...rest } = imageObj;

  const search = imageObj.uri.match(/\/([a-zA-Z0-9\s\._-]+.[a-z]{3,4})$/);
  const fileName = search ? search[1] : "attachment";
  return {
    uri:
      Platform.OS === "android"
        ? imageObj.uri
        : imageObj.uri.replace("file://", ""),
    type: getImageType(imageObj.uri),
    name: fileName,
    ...rest,
  };
};

export default function EyeWitnessScreen() {
  const [imageObjects, setFieldValue] = useState<ImageInfo[]>([]);

  const initialValues = {
    email: "",
    name: "",
    subject: "",
    details: "",
  };

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required().trim(),
    name: Yup.string()
      .min(3, "Should not be less than 3 characters")
      .required()
      .trim(),
    subject: Yup.string()
      .min(5, "Should not be less than 5 characters")
      .max(200)
      .required()
      .trim(),
    details: Yup.string().nullable().trim(),
  });

  const handleAdd = (imageObj) => {
    // setFieldValue(name, [...imageObjects, imageObj]);
    setFieldValue((p) => [...p, imageObj]);
  };

  const handleRemove = (uri) => {
    /* setFieldValue(
      name,
      imageObjects.filter((imageObj) => imageObj.uri !== uri),
    ); */
    setFieldValue((p) => [...p.filter((imageObj) => imageObj.uri !== uri)]);
  };

  const _handleSubmit = (
    values,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<{
      email: string;
      name: string;
      subject: string;
      details: string;
    }>
  ) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    imageObjects.forEach((imageObj) =>
      formData.append("attachments[]", buildImageObj(imageObj))
    );

    // const body = JSON.stringify(values);
    fetch("https://baffiloyalty.regects.com/api/customer/auth/sendmail/test", {
      body: formData,
      method: "POST",
    })
      .then(async (response) => {
        const result = await response.json();
        const { status } = result;

        if (status === "success") {
          Toast.show({
            type: "success",
            text1: "Sent",
            text2: "Your Report has been sent.",
            bottomOffset: 20,
          });
          resetForm();
          setFieldValue([]);
        }
      })
      .catch((err: Error) => {
        console.error(err);
        Toast.show({
          type: "error",
          text1: "Failed ",
          text2:
            "The attempt to send your request was unsuccessful for some reason. Please try once more.",
          bottomOffset: 20,
          visibilityTime: 3000,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <ScrollView style={{ padding: "5%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={_handleSubmit}
      >
        {({
          errors,
          handleChange,
          values,
          handleSubmit,
          isValid,
          isSubmitting,
        }) => (
          <Fragment>
            <TextInput
              label={errors.name ?? "Full name"}
              value={values.name}
              onChangeText={handleChange("name")}
              style={styles.textInput}
              mode="outlined"
              outlineColor="rgba(0, 0, 0, 0.23)"
              activeOutlineColor="rgba(4, 146, 220, 1)"
              error={Boolean(errors.name?.length)}
            />
            <TextInput
              label={errors.email ?? "Email"}
              value={values.email}
              onChangeText={handleChange("email")}
              style={styles.textInput}
              mode="outlined"
              outlineColor="rgba(0, 0, 0, 0.23)"
              activeOutlineColor="rgba(4, 146, 220, 1)"
              error={Boolean(errors.email?.length)}
            />
            <TextInput
              label={errors.subject ?? "Subject"}
              value={values.subject}
              onChangeText={handleChange("subject")}
              style={styles.textInput}
              mode="outlined"
              outlineColor="rgba(0, 0, 0, 0.23)"
              activeOutlineColor="rgba(4, 146, 220, 1)"
              error={Boolean(errors.subject?.length)}
            />
            <TextInput
              label={errors.details ?? "News Details"}
              value={values.details}
              onChangeText={handleChange("details")}
              style={styles.textInput}
              mode="outlined"
              outlineColor="rgba(0, 0, 0, 0.23)"
              activeOutlineColor="rgba(4, 146, 220, 1)"
              error={Boolean(errors.details?.length)}
              multiline
              numberOfLines={12}
            />
            <Spacer size={10} />
            <View>
              <ImageInputList
                imageObjects={imageObjects}
                onAddImage={handleAdd}
                onRemoveImage={handleRemove}
              />
            </View>

            <Spacer size={10} />
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              color="rgba(4, 98, 171, 1)"
            >
              Send Report
            </Button>
            <Spacer size={30} />
          </Fragment>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
});
