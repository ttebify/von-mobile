import React, { Fragment, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ImageInputList from "../components/ImageInputList";
import Spacer from "../components/Spacer";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function EyeWitnessScreen() {
  const [imageObjects, setFieldValue] = useState<any[]>([]);

  const initialValues = {
    email: "",
    name: "",
    subject: "",
    details: "",
  };

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required(),
    name: Yup.string()
      .min(3, "Should not be less than 3 characters")
      .required(),
    subject: Yup.string()
      .min(5, "Should not be less than 5 characters")
      .max(200)
      .required(),
    details: Yup.string().nullable(),
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
    // const body = JSON.stringify(values);
    axios
      .post(
        "https://baffiloyalty.regects.com/api/customer/auth/sendmail/test",
        values,
        { timeout: 8000 }
      )
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Sent",
          text2: "Your Report has been sent.",
          bottomOffset: 20,
        });
        resetForm();
      })
      .catch((err: Error) => {
        console.error(err.message);
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
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
              label={errors.name ?? "Full Name"}
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
