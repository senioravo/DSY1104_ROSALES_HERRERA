export default function ArticleImage({ src, alt, caption }) {
  return (
    <div className="mb-5 rounded-4 overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className="w-100"
        style={{ 
          height: '450px', 
          objectFit: 'cover'
        }}
      />
      {caption && (
        <p className="text-muted text-center mt-3 small fst-italic">
          {caption}
        </p>
      )}
    </div>
  );
}
