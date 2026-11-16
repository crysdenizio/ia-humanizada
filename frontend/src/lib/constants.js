export const CONTACT = {
  whatsapp: "5512988217813",
  whatsappDisplay: "(12) 98821-7813",
  email: "contato.deniziosglobal@gmail.com",
  instagram: "deniziosautomacao",
  instagramUrl: "https://instagram.com/deniziosautomacao",
};

export const WHATSAPP_LINK = (msg = "Olá! Vim pelo site e gostaria de saber mais sobre a automação com IA.") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

export const LOGO_URL = "https://customer-assets.emergentagent.com/job_3b1f56ac-6f46-4259-b8ea-d33211c4462c/artifacts/cv7grtyj_image.png";

// Imagens com tamanho e qualidade limitados (antes vinham no tamanho original, muito pesadas)
export const IMAGES = {
  clinics: "https://images.unsplash.com/photo-1758691462353-36b215702253?auto=format&fit=crop&w=900&q=70",
  hero_texture: "https://images.pexels.com/photos/21031387/pexels-photo-21031387.jpeg?auto=compress&cs=tinysrgb&w=1200",
  testimonial1: "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&w=600",
  testimonial2: "https://images.unsplash.com/photo-1699899657680-421c2c2d5064?auto=format&fit=crop&w=600&q=70",
  testimonial3: "https://images.pexels.com/photos/14589344/pexels-photo-14589344.jpeg?auto=compress&cs=tinysrgb&w=600",
};
