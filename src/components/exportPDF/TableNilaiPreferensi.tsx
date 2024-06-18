import { StyleSheet, Text, View } from "@react-pdf/renderer";

type Props = {
  number: number;
  data: any;
};

const styles = StyleSheet.create({
  oddStyle: {
    flexDirection: "row",
    fontSize: "10pt",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    paddingVertical: "2pt",
  },
  evenStyle: {
    flexDirection: "row",
    fontSize: "10pt",
    backgroundColor: "#F5F5F5",
    textAlign: "center",
    paddingVertical: "2pt",
  },
});

const NilaiPreferensiPDF = ({ number, data }: Props) => {
  return (
    <View style={(number + 1) % 2 === 0 ? styles.evenStyle : styles.oddStyle}>
      <Text style={{ flex: 0.4, paddingVertical: "1.5pt" }}>{number + 1}</Text>
      <Text style={{ flex: 1, paddingVertical: "1.5pt" }}>
        {data.employee.name}
      </Text>
      <Text style={{ flex: 1, paddingVertical: "1.5pt" }}>{data.preferenceScore}</Text>
      <Text style={{ flex: 0.8, paddingVertical: "1.5pt"}}>{data.isPassedScore}</Text>
      <Text style={{ flex: 0.8, paddingVertical: "1.5pt" }}>{data.status}</Text>
    </View>
  );
};

export default NilaiPreferensiPDF;
