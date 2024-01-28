import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function App() {
  const size = 3;
  const cross = "X";
  const naught = "O";
  const empty = " ";

  const initial: string[][] = [
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty],
  ];

  const [board, setBoard] = useState<string[][]>(initial);
  const [player, setPlayer] = useState<string>(cross);
  const [columnWin, setColumnWin] = useState<number[]>([0, 0, 0]);
  const [rowWin, setRowWin] = useState<number[]>([0, 0, 0]);
  const [diagWin, setDiagWin] = useState<number[]>([0]);
  const [revDiagWin, setRevDiagWin] = useState<number[]>([0]);
  const [message, setMessage] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((boardRow, columnIndex) => {
          return (
            <View key={columnIndex} style={styles.row}>
              {boardRow.map((boardTile, rowIndex) => {
                return (
                  <TouchableOpacity
                    key={rowIndex}
                    onPress={() => {
                      if (board[columnIndex][rowIndex] === empty) {
                        board[columnIndex][rowIndex] = player;
                        setBoard(board);
                        const winCheckValue = player === cross ? 1 : -1;
                        columnWin[columnIndex] += winCheckValue;
                        setColumnWin(columnWin);
                        rowWin[rowIndex] += winCheckValue;
                        setRowWin(rowWin);
                        if (rowIndex === columnIndex) {
                          diagWin[0] += winCheckValue;
                          setDiagWin(diagWin);
                        }
                        if (rowIndex === size - 1 - columnIndex) {
                          revDiagWin[0] += winCheckValue;
                          setRevDiagWin(revDiagWin);
                        }
                        if (
                          Math.abs(columnWin[columnIndex]) === size ||
                          Math.abs(rowWin[rowIndex]) === size ||
                          Math.abs(diagWin[0]) === size ||
                          Math.abs(revDiagWin[0]) === size
                        ) {
                          setMessage("Winner is " + player);
                        } else {
                          setPlayer(player === cross ? naught : cross);
                        }
                      }
                    }}
                  >
                    <Text style={styles.text}>{boardTile}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
      <Text style={styles.message}>{message}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  board: {
    padding: 5,
    backgroundColor: "#777777",
  },
  row: {
    flexDirection: "row",
  },
  text: {
    padding: 5,
    margin: 5,
    fontSize: 100,
    fontFamily: "monospace",
    backgroundColor: "#ffffff",
  },
  message: {
    padding: 5,
    margin: 5,
    fontSize: 30,
    fontFamily: "monospace",
    backgroundColor: "#ffffff",
  },
});
