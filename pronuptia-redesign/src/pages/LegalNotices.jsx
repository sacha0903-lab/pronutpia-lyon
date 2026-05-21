import { motion } from 'framer-motion'

export default function LegalNotices() {
  return (
    <section className="pt-[72px] lg:pt-[80px]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="label-upper mb-4">Informations légales</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-12">
            Mentions Légales
          </h1>
        </motion.div>

        <div className="space-y-10 text-sm text-muted leading-relaxed">
          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">1. Éditeur du site</h2>
            <p>
              Le site pronuptia.fr est édité par la société Alexis Mariage SAS,<br />
              au capital social de [capital],<br />
              immatriculée au RCS de Créteil,<br />
              dont le siège social est situé au :<br />
              7 rue Théodore Honoré, 94130 Nogent-sur-Marne, France.
            </p>
            <p className="mt-3">
              Directeur de la publication : Alexis Jodeau<br />
              Téléphone : 01 42 77 92 63<br />
              E-mail : info@alexis-mariage.fr
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">2. Hébergement</h2>
            <p>
              Le site est hébergé par :<br />
              OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.<br />
              Téléphone : 1007
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus du site pronuptia.fr (textes, images, photographies,
              vidéos, logos, marques, icônes) est protégé par le droit de la propriété
              intellectuelle. Toute reproduction, représentation, modification ou adaptation,
              totale ou partielle, est strictement interdite sans l'accord préalable et écrit
              de la société Alexis Mariage SAS.
            </p>
            <p className="mt-3">
              La marque Pronuptia® est une marque déposée. Toute utilisation non autorisée
              constitue une contrefaçon passible de sanctions pénales.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">4. Responsabilité</h2>
            <p>
              La société Alexis Mariage SAS s'efforce d'assurer l'exactitude et la mise à jour
              des informations diffusées sur le site. Toutefois, elle ne peut garantir
              l'exactitude, la précision ou l'exhaustivité des informations mises à disposition
              sur ce site.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">5. Liens hypertextes</h2>
            <p>
              Le site pronuptia.fr peut contenir des liens vers d'autres sites internet.
              La société Alexis Mariage SAS ne saurait être tenue responsable du contenu de
              ces sites tiers ni des éventuels dommages pouvant résulter de leur consultation.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">6. Crédits photographiques</h2>
            <p>
              Photographies : Yves Lavallette<br />
              Tous droits réservés.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-charcoal mb-4">7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
