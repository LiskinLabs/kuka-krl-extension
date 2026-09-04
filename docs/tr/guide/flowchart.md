# Etkileşimli Akış Şeması Görüntüleyici

<span class="badge pro">Pro Özellik</span>

Karmaşık iç içe geçmiş mantıkları (`IF`, `SWITCH`, `LOOP`) manuel olarak takip etmeyi bırakın. KUKA KRL Professional, karmaşık `.src` programlarını temiz, görsel kontrol akış diyagramlarına dönüştürür.

![Flowchart Viewer Demo](/media/control_flow_graph.gif)

## Temel Özellikler

* **Çift Yönlü Gezinme**: Akış şemasındaki herhangi bir bloğa tıklayarak editördeki tam kod satırına gidin.
* **Alt Program Detaylandırma**: Alt program çağrılarına (ör. `GrabPart()`) tıklayarak ilgili akış şemasını yükleyin.
* **Detaylı Bilgi Modu**: Bayrakları, zamanlayıcıları ve G/Ç durumlarını renk göstergeleriyle doğrudan akış şeması bloklarında görüntüleyin.
* **SVG Dışa Aktarma**: Müşteri belgelerine doğrudan eklemek için alt programların vektör grafiklerini dışa aktarın.

![Vector Flowchart Example](/media/cell_flowchart.svg)

## Nasıl Kullanılır
Herhangi bir `.src` dosyasını açın ve editörün sağ üst köşesindeki `Show Control Flow Graph` simgesine tıklayın veya Komut Paletinden `KRL: Show Control Flow Graph` komutunu çalıştırın.
