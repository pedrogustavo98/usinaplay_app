import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'usinaplay',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,       // Tempo em milissegundos que o splash será exibido
      launchAutoHide: true,           // Oculta automaticamente após a duração
      backgroundColor: '#ffffffff',   // Cor de fundo em ARGB (branco aqui)
      androidScaleType: 'CENTER_CROP',// Escala a imagem para Android
      showSpinner: false              // Se deve exibir um spinner ou não
    }
  }
};

export default config;
