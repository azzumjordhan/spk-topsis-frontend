import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import NilaiPreferensiPDF from "./TableNilaiPreferensi";

const styles = StyleSheet.create({
  root: {
    width: "100vw",
    height: "100vh",
  },
  page: {
    paddingHorizontal: "1in",
    paddingVertical: ".6in",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
  },
});

const HasilTopsisPDF = ({ data }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text
        style={{
          marginHorizontal: "auto",
          fontSize: "18pt",
          marginVertical: "8pt",
          fontWeight: "semibold",
        }}
      >
        Hasil Evaluasi Topsis
      </Text>
      <View style={styles.table}>
        <View
          style={{
            flexDirection: "row",
            fontSize: "11pt",
            paddingVertical: "2pt",
            textAlign: "center",
            borderBottom: 1,
          }}
        >
          <Text style={{ flex: 0.4, paddingVertical: "1.5pt" }}>No</Text>
          <Text style={{ flex: 1, paddingVertical: "1.5pt" }}>
            Nama Karyawan
          </Text>
          <Text style={{ flex: 1, paddingVertical: "1.5pt" }}>
            Nilai Preferensi
          </Text>
          <Text style={{ flex: 0.8, paddingVertical: "1.5pt" }}>Nilai Kelulusan</Text>
          <Text style={{ flex: 0.8, paddingVertical: "1.5pt" }}>Status</Text>
        </View>
        {data.map((row: any, index: number) => (
          <NilaiPreferensiPDF key={index} number={index} data={row} />
        ))}
      </View>
    </Page>
  </Document>
);

export default HasilTopsisPDF;
