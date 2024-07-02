import VIDEO from '@/assets/video_screen.mp4'

export const VideoScreen = () => {
  return (
    <video playsInline autoPlay muted className="h-screen w-full object-cover" >
      <source src={VIDEO} type="video/mp4" />
    </video>
  )
}
