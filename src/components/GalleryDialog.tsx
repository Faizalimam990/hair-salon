import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { gallery } from '../data/salon';
export default function GalleryDialog({
  selected,
  onSelect,
  onClose,
}: {
  selected: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  const item = gallery[selected];
  const move = (direction: number) =>
    onSelect((selected + direction + gallery.length) % gallery.length);
  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="gallery-title"
      className="gallery-dialog"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') move(1);
        if (e.key === 'ArrowLeft') move(-1);
      }}
    >
      <div className="lightbox-header">
        <span>
          {selected + 1} / {gallery.length} · Style inspiration
        </span>
        <IconButton onClick={onClose} aria-label="Close gallery">
          <X />
        </IconButton>
      </div>
      <div className="lightbox-image">
        <img key={item.image} src={`/images/${item.image}.jpg`} alt={item.title} />
        <IconButton className="lightbox-prev" onClick={() => move(-1)} aria-label="Previous image">
          <ArrowLeft />
        </IconButton>
        <IconButton className="lightbox-next" onClick={() => move(1)} aria-label="Next image">
          <ArrowRight />
        </IconButton>
      </div>
      <div className="lightbox-caption" aria-live="polite">
        <h3 id="gallery-title">{item.title}</h3>
        <p>{item.tag} · Illustrative photography</p>
      </div>
    </Dialog>
  );
}
