# DržavaInfo

Preprosta spletna aplikacija, zgrajena z uporabo Spring Boot in Angular, za hiter pregled seznama in podrobnosti držav.

## Funkcionalnosti:
- ogled IP-ja strežnika, pridobljenega iz zunanjega API-ja, in časa zahteve,
- pregled seznama držav v obliki tabele
- izbira države na tabeli, ki se izpiše v konzoli na strežniku
- ogled podrobnosti o izbrani državi, pridobljene iz zunanjega API-ja
- osnovna opozorila o napakah pri pridobivanju podatkov s strežnika.

## Navodila za zagon

V repozitoriju se za takojšnji zagon nahaja zgrajena aplikacija v obliki datoteke `app.jar`, ki se zažene z ukazom:

```bash
   java -jar app.jar

```

Do aplikacije se dostopa preko brskalnika, na naslovu http://localhost:8080/naloga ali http://localhost:8080/naloga/home.

## Uporabljeni API-ji

- ipify API
- Restcountries v3.1