    const produkty = [
      {
        id: 101,
        nazwa: "Jogurt naturalny",
        firma: "Mleczarnia Polska",
        waga: "200g",
        kalorie: 150,
        dataWaznosci: "2025-08-10",
        cena: "3.49 zł"
      },
      {
        id: 102,
        nazwa: "Chleb razowy",
        firma: "Piekarnia Krakowska",
        waga: "500g",
        kalorie: 1200,
        dataWaznosci: "2025-06-15",
        cena: "5.90 zł"
      },
      {
        id: 103,
        nazwa: "Masło extra",
        firma: "DairyLand",
        waga: "250g",
        kalorie: 1800,
        dataWaznosci: "2025-07-01",
        cena: "7.30 zł"
      },
      {
        id: 104,
        nazwa: "Szynka wieprzowa",
        firma: "Mięsny Raj",
        waga: "300g",
        kalorie: 900,
        dataWaznosci: "2025-06-05",
        cena: "12.50 zł"
      }
    ];

    const buttonsDiv = document.getElementById("productButtons");

    produkty.forEach((produkt, index) => {
      const btn = document.createElement("button");
      btn.textContent = produkt.nazwa;
      btn.onclick = () => pokazProdukt(index);
      buttonsDiv.appendChild(btn);
    });

    function pokazProdukt(index) {
      const produkt = produkty[index];
      const box = document.getElementById("infoBox");
      box.style.display = "block";
      box.innerHTML = `
        <p><strong>ID:</strong> ${produkt.id}</p>
        <p><strong>Nazwa:</strong> ${produkt.nazwa}</p>
        <p><strong>Firma:</strong> ${produkt.firma}</p>
        <p><strong>Waga:</strong> ${produkt.waga}</p>
        <p><strong>Ilość kalorii:</strong> ${produkt.kalorie} kcal</p>
        <p><strong>Data ważności:</strong> ${produkt.dataWaznosci}</p>
        <p><strong>Cena:</strong> ${produkt.cena}</p>
      `;
    }