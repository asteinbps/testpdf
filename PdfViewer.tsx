import React, { Component } from "react";
import {
  Platform,
  BackHandler,
  Alert,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { DocumentView, RNPdftron } from "@pdftron/react-native-pdf";

type Props = {};
export default class PdfViewer extends Component<Props> {
  constructor(props: any) {
    super(props);
    // RNPdftron.initialize("Insert commercial license key here after purchase");
    RNPdftron.enableJavaScript(true);
  }

  onLeadingNavButtonPressed = () => {
    console.log("leading nav button pressed");
    if (Platform.OS === "ios") {
      Alert.alert(
        "App",
        "onLeadingNavButtonPressed",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    } else {
      BackHandler.exitApp();
    }
  };

  protected _viewer: DocumentView | undefined | null = null;

  protected onSave = () => {
    if (this._viewer)
    this._viewer.saveDocument().then((filePath) => {
      Alert.alert(filePath || 'no filePath');
      console.log('saveDocument:', filePath);
    }).catch((err) => {
      Alert.alert(err.message);
    });
  }

  render() {
    const path =
      "https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf";

    return (
      <View style={{height: '100%', width: '100%'}}>
        <TouchableOpacity style={{width: '100%', backgroundColor: 'blue'}} onPress={this.onSave}>
          <Text style={{width: '100%', textAlign: 'center', color: 'white'}}>SAVE</Text>
        </TouchableOpacity>
      <DocumentView
        ref={(ref) => {this._viewer = ref}}
        document={path}
        showLeadingNavButton={true}
        leadingNavButtonIcon={
          Platform.OS === "ios"
            ? "ic_close_black_24px.png"
            : "ic_arrow_back_white_24dp"
        }
        onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
      />
      </View>
    );
  }
}
