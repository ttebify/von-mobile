import React from "react";
import { ScrollView } from "react-native";
import {
  List,
  IconButton,
} from "react-native-paper";
import FormBuilder from "../containers/FormBuilderContainer";
import { DefaultTheme } from "react-native-paper";

const createAppFormData = [
  {
    section: {
      title: "Create New App",
      data: [
        { text: { name: "name", placeholder: "App Name" } },
        { text: { name: "title", placeholder: "App Title" } },
        { submit: { label: "Create", mode: "contained" } },
      ],
    },
  },
];

const CreateAppForm = ({ action, ...rest }) => {
  return <FormBuilder action={action} data={createAppFormData} {...rest} />;
};

const ChooseApp = ({ apps, enterApp, enterSettings }) => {
  const showApps = apps.map((app, index) => {
    const theme = app.theme || DefaultTheme;

    const colors = { text: theme.colors.background };

    const style = {
      backgroundColor: theme.colors.accent,
      color: theme.colors.primary,
      marginTop: 5,
    };

    return (
      <List.Item
        theme={theme}
        key={`app-${index}`}
        style={style}
        onPress={() => enterApp(index)}
        title={app.name}
        description={app.title}
        right={() => (
          <IconButton onPress={() => enterSettings(index)} icon="key" />
        )}
      />
    );
  });

  if (apps.length === 0) {
    return null;
  }

  return (
    <List.Section>
      <List.Subheader>Choose an App</List.Subheader>
      {showApps}
    </List.Section>
  );
};

const AppManagerComp = ({ apps, action, enterApp, enterSettings }) => {
  return (
    <ScrollView style={{ flex: 1, marginTop: 20 }}>
      <ChooseApp
        apps={apps}
        enterApp={enterApp}
        enterSettings={enterSettings}
      />

      <CreateAppForm action={action} clear={true} />
    </ScrollView>
  );
};

export default AppManagerComp;
