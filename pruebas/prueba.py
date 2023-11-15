import requests
from tqdm import tqdm
import time

# URL de la app y las APIs a probar
app_url = "https://sprightly-melomakarona-25c8f2.netlify.app/"
api_url_1 = "https://productosexamen.azurewebsites.net/api/productos"
api_url_2_template = "https://productosexamen.azurewebsites.net/api/productos/{}"

def verificar_disponibilidad():
    # Verificar disponibilidad de la aplicación
    try:
        print("Verificando disponibilidad de la aplicación...")
        time.sleep(1)  # Simulando carga
        response = requests.get(app_url)
        if response.status_code == 200:
            print("La aplicación está disponible")
        else:
            print(f"La aplicación no está disponible: Código de estado {response.status_code}")
    except requests.RequestException as e:
        print("Error al intentar acceder a la aplicación:", e)

def probar_apis():
    # Probar las APIs
    fallos = 0
    exitos = 0
    try:
        # Primera API
        print("\nProbando la primera API...")
        time.sleep(1)  # Simulando carga
        response_api_1 = requests.get(api_url_1)
        if response_api_1.status_code == 200:
            print("API 1: ¡Funciona!")
            exitos += 1
        else:
            print(f"API 1: Falló con código de estado {response_api_1.status_code}")
            fallos += 1

        # Segunda API con IDs del 1 al 30
        print("\nProbando la segunda API...")
        for i in tqdm(range(1, 31), desc="Probando la segunda API", unit="API"):
            url = api_url_2_template.format(i)
            time.sleep(0.1)  # Simulando carga
            response_api_2 = requests.get(url)
            if response_api_2.status_code == 200:
                print(f"API 2 para ID {i}: ¡Funciona!")
                exitos += 1
            else:
                print(f"API 2 para ID {i}: Falló con código de estado {response_api_2.status_code}")
                fallos += 1
                time.sleep(0.1)  # Simulando carga

        # Resumen de pruebas
        print("\n--- Pruebas completas ---")
        print(f"Pruebas exitosas: {exitos}")
        print(f"Pruebas fallidas: {fallos}")
        if fallos == 0:
            print("¡Todas las pruebas fueron exitosas!")
        else:
            print("Algunas pruebas fallaron. Revisar los mensajes anteriores para más detalles.")

    except requests.RequestException as e:
        print("Error al intentar acceder a las APIs:", e)

if __name__ == "__main__":
    print("Realizando pruebas...")
    verificar_disponibilidad()
    probar_apis()
    print("Fin de las pruebas.")
