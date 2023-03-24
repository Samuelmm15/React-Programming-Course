import { useState, useEffect } from "react";

export default function Definition() {
  // Hay que tener en cuenta que siempre siempre siempre, la estructura general de un useEffect es de la sigueinte manera:
  // useEffect(() => {}, [dependencias]);
  useEffect(() => {
    console.log('Page Loaded');
  }, []);
  return <p>Here is a definition</p>;
}