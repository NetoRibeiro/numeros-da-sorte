import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function PrivacyPolicy() {
  useSEO(
    'Política de Privacidade | Mega-Sena Predictor',
    'Política de privacidade do Mega-Sena Predictor. Informações sobre coleta de dados, cookies, Google AdSense e seus direitos de privacidade.',
    'política de privacidade, privacidade mega-sena, proteção de dados, LGPD, cookies, google adsense'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border bg-white/10 border-white/20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 mb-6 transition-colors"
          >
            ← Voltar para o início
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Política de Privacidade</h1>

          <div className="space-y-6 text-green-100">
            <p className="text-sm text-green-300">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">1. Informações que Coletamos</h2>
              <p className="mb-3">
                O Mega-Sena Predictor coleta informações limitadas para fornecer e melhorar nossos serviços:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de Cache Local:</strong> Armazenamos resultados da loteria no navegador para melhorar o desempenho.</li>
                <li><strong>Informações de Uso:</strong> Coletamos dados anônimos sobre como você usa o site através de cookies e ferramentas de análise.</li>
                <li><strong>Dados de Publicidade:</strong> Usamos Google AdSense para exibir anúncios. O Google pode coletar dados através de cookies para personalização de anúncios.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">2. Uso de Cookies</h2>
              <p className="mb-3">
                Utilizamos cookies para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Armazenar preferências do usuário</li>
                <li>Melhorar a experiência de navegação</li>
                <li>Analisar o tráfego do site</li>
                <li>Exibir anúncios personalizados (Google AdSense)</li>
              </ul>
              <p className="mt-3">
                Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade do site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">3. Google AdSense</h2>
              <p className="mb-3">
                Este site usa Google AdSense para exibir anúncios. O Google pode usar cookies para exibir anúncios baseados em suas visitas anteriores a este site ou outros sites. Você pode desativar anúncios personalizados visitando as
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:text-yellow-200 underline ml-1"
                >
                  Configurações de Anúncios do Google
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">4. Compartilhamento de Dados</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Quando exigido por lei</li>
                <li>Para parceiros de publicidade (Google AdSense) conforme descrito acima</li>
                <li>Para proteger nossos direitos legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">5. Segurança</h2>
              <p>
                Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet é 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">6. Links Externos</h2>
              <p>
                Este site pode conter links para sites externos. Não somos responsáveis pelas práticas de privacidade de outros sites. Recomendamos ler as políticas de privacidade de cada site que você visita.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">7. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta política de privacidade periodicamente. Notificaremos sobre mudanças significativas publicando a nova política nesta página com uma nova data de "Última atualização".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">8. Seus Direitos</h2>
              <p className="mb-3">
                Você tem o direito de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acessar os dados que coletamos sobre você</li>
                <li>Solicitar a correção de dados imprecisos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Optar por não receber anúncios personalizados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">9. Contato</h2>
              <p>
                Se você tiver dúvidas sobre esta política de privacidade, entre em contato através da nossa
                <Link to="/contact" className="text-yellow-300 hover:text-yellow-200 underline ml-1">
                  página de contato
                </Link>.
              </p>
            </section>

            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <p className="text-yellow-200 text-sm">
                ⚠️ <strong>Isenção de Responsabilidade:</strong> Este site é apenas para fins de entretenimento. Não garantimos ganhos em jogos de loteria. A Mega-Sena é um jogo de azar e os resultados são completamente aleatórios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
