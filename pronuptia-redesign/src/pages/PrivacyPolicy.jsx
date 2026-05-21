import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <section className="pt-[72px] lg:pt-[80px]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="label-upper mb-4">Informations légales</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-12">
            Politique de Confidentialité
          </h1>
        </motion.div>

        <div className="prose-legal space-y-10 text-sm text-muted leading-relaxed">
          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">1. Collecte des données personnelles</h2>
            <p>
              Dans le cadre de l'utilisation du site pronuptia.fr, nous sommes amenés à collecter
              des données personnelles vous concernant. La présente politique de confidentialité
              a pour objet de vous informer sur les conditions dans lesquelles ces données sont
              collectées, traitées et utilisées.
            </p>
            <p className="mt-3">
              Les données personnelles collectées sur ce site sont les suivantes : nom, prénom,
              adresse e-mail, numéro de téléphone, et toute information que vous choisissez de
              nous communiquer via le formulaire de contact.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">2. Finalités du traitement</h2>
            <p>Les données personnelles collectées sont utilisées pour :</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Répondre à vos demandes de contact et d'information</li>
              <li>Vous envoyer notre newsletter (avec votre consentement)</li>
              <li>Gérer les prises de rendez-vous en boutique</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">3. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pendant une durée n'excédant pas celle
              nécessaire aux finalités pour lesquelles elles sont traitées, conformément au
              Règlement Général sur la Protection des Données (RGPD).
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">4. Droits des utilisateurs</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de
              suppression, de limitation, de portabilité et d'opposition concernant vos données
              personnelles.
            </p>
            <p className="mt-3">
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante :
              <a href="mailto:info@alexis-mariage.fr" className="text-gold hover:text-gold-dark transition-colors ml-1">
                info@alexis-mariage.fr
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">5. Cookies</h2>
            <p>
              Le site pronuptia.fr utilise des cookies pour améliorer votre expérience de
              navigation. Ces cookies permettent de mémoriser vos préférences et de mesurer
              l'audience du site. Vous pouvez à tout moment modifier les paramètres de gestion
              des cookies dans votre navigateur.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">6. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données est la société Alexis Mariage SAS,<br />
              7 rue Théodore Honoré, 94130 Nogent-sur-Marne, France.<br />
              Téléphone : 01 42 77 92 63<br />
              E-mail : info@alexis-mariage.fr
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
