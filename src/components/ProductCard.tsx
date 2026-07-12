import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      {product.image && (
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
        />
      )}
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 1, flexWrap: "wrap", gap: 0.5 }}
        >
          {product.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
